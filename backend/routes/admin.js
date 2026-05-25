const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Middleware admin
const isAdmin = (req, res, next) => {
  const adminKey = req.headers['x-admin-key'];
  if (adminKey === process.env.ADMIN_KEY) {
    next();
  } else {
    res.status(403).json({ error: 'Acesso negado' });
  }
};

// Listar usuários
router.get('/usuarios', isAdmin, async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        cpf: true,
        ativo: true,
        criado: true,
        conta: true
      }
    });

    res.json({ usuarios, total: usuarios.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar usuários' });
  }
});

// Adicionar saldo
router.post('/adicionar-saldo', isAdmin, async (req, res) => {
  try {
    const { usuarioId, valor, motivo } = req.body;

    if (!usuarioId || !valor) {
      return res.status(400).json({ error: 'usuarioId e valor são obrigatórios' });
    }

    const conta = await prisma.conta.update({
      where: { usuarioId },
      data: { saldo: { increment: valor } }
    });

    // Registrar transação admin
    await prisma.transacao.create({
      data: {
        remetenteId: usuarioId,
        destinatarioId: usuarioId,
        valor,
        tipo: 'deposito',
        descricao: `Depósito admin: ${motivo || 'Sem motivo especificado'}`
      }
    });

    res.json({
      message: 'Saldo adicionado com sucesso',
      novoSaldo: conta.saldo
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao adicionar saldo' });
  }
});

// Remover saldo
router.post('/remover-saldo', isAdmin, async (req, res) => {
  try {
    const { usuarioId, valor, motivo } = req.body;

    if (!usuarioId || !valor) {
      return res.status(400).json({ error: 'usuarioId e valor são obrigatórios' });
    }

    const conta = await prisma.conta.findUnique({
      where: { usuarioId }
    });

    if (conta.saldo < valor) {
      return res.status(400).json({ error: 'Saldo insuficiente' });
    }

    const contaAtualizada = await prisma.conta.update({
      where: { usuarioId },
      data: { saldo: { decrement: valor } }
    });

    // Registrar transação admin
    await prisma.transacao.create({
      data: {
        remetenteId: usuarioId,
        destinatarioId: usuarioId,
        valor,
        tipo: 'saque',
        descricao: `Saque admin: ${motivo || 'Sem motivo especificado'}`
      }
    });

    res.json({
      message: 'Saldo removido com sucesso',
      novoSaldo: contaAtualizada.saldo
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao remover saldo' });
  }
});

// Listar transações
router.get('/transacoes', isAdmin, async (req, res) => {
  try {
    const transacoes = await prisma.transacao.findMany({
      include: {
        remetente: { select: { nome: true, email: true } },
        destinatario: { select: { nome: true, email: true } }
      },
      orderBy: { criada: 'desc' },
      take: 100
    });

    res.json({ transacoes, total: transacoes.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar transações' });
  }
});

module.exports = router;
