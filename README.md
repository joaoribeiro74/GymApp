# 💪 GymApp - Aplicativo de Academia

## 🧾 Sobre o app

**GymTrack** é um aplicativo de academia voltado para aqueles que desejam acompanhar seus treinos, progresso físico e desempenho ao longo do tempo. O app possibilita a criação e acompanhamento de treinos personalizados, visualização de estatísticas de progresso e gerenciamento do perfil do usuário.

### ✔️ Funcionalidades básicas (prioritárias)

- [ ] Tela de Boas-Vindas
  - [ ] Logo do App
  - [ ] Mensagem de Boas-Vindas
  - [ ] Redirecionamento para cadastro
- [ ] Tela de Cadastro
  - [ ] Campos de e-mail, nome de usuário e senha
  - [ ] Botão de Cadastro
  - [ ] Link para redirecionamento ao login, caso já tenha cadastro
  - [ ] Validação de dados
- [ ] Tela de Login
  - [ ] Campos de e-mail ou nome de usuário e senha
  - [ ] Links para redirecionamento ao cadastro e trocar senha
  - [ ] Botão de Login
  - [ ] Validação + feedback de erro
- [ ] Tela Inicial
  - [ ] Saudação personalizada ("Bom dia, João!")
  - [ ] Resumo do Próximo treino (nome do treino, dia)
  - [ ] Resumo do progresso (último recorde, peso atual, gráfico miniatura)
  - [ ] Botão para criar treino
  - [ ] Menu lateral com ícones para outras telas
- [ ] Tela de Criação de Treinos
  - [ ] Campo para nome do treino
  - [ ] Seletor de categoria (Peito, Costas, Pernas...)
  - [ ] Botão para adicionar exercício
  - [ ] Botão para salvar treino
- [ ] Tela de Treinos
  - [ ] Lista de treinos existentes
  - [ ] Botão para verificar os treinos
  - [ ] Para o treino do dia, mostras exercícios em sequência
  - [ ] Para cada exercício, colocar o número de séries, número de repetições em cada série, peso e colocar notas ou observações
  - [ ] Botões de concluir série e finalizar treino
- [ ] Tela de Progresso
  - [ ] Gráfico de evolução de peso corporal
  - [ ] Recordes de peso por exercício
- [ ] Tela de Atividade
  - [ ] Calendário com dias de treino marcados
  - [ ] Quantidade de treinos no mês atual
  - [ ] Média de treinos por semana
  - [ ] Botão para ver detalhes de um dia específico
- [ ] Tela de Perfil
  - [ ] Foto do usuário (avatar ou real)
  - [ ] Nome de usuário
  - [ ] E-mail
  - [ ] Peso atual (editável)
  - [ ] Objetivo: perder peso, ganhar massa, etc
  - [ ] Botão de editar perfil
- [ ] Tela de Configurações
  - [ ] Tema (claro/escuro)
  - [ ] Deslogar
  - [ ] Sobre o app / Versão
- [ ] Mensagens de Erro ou Feedback
  - [ ] Exibição de mensagens de erro
  - [ ] Feedbacks: "Treino salvo com sucesso", "Senha incorreta", etc

### 🌟 Funcionalidades adicionais (possíveis incrementos)

- [ ] Tela de Conquistas / Gamificação
  - [ ] Conquistas: "7 dias seguidos", "Recorde batido"
  - [ ] Barra de progresso para metas
- [ ] Notificações na Tela de Configurações: "Ativar lembretes de treino", etc
- [ ] Histórico de metas alcançadas na Tela de Perfil
- [ ] Tempo médio por sessão na Tela de Atividade
- [ ] Filtros por período, comparativo entre semanas e meses na Tela de Progresso
- [ ] Timer para descanso e peso sugerido na tela de Treino
- [ ] Sugestão automática de treinos com base em histórico
- [ ] Integração com Apple Health/Google Fit, entre outros

---

## 🖼️ Protótipos de tela

As telas foram prototipadas no Figma e estão disponíveis no link abaixo:

🔗 [Ver protótipo no Figma](https://www.figma.com/design/2OVLbFHwbsMrXjEjDIOQtH/Untitled?node-id=1-2&t=ie8akmn2V99Lhde8-1)

---

## 🗃️ Modelagem do banco

O app utilizará um banco de dados **NoSQL (Firebase ou similar)** para armazenar os dados dos usuários e seus treinos.

🔗 [Diagrama do banco de dados](https://drive.google.com/file/d/12-y7XcVq6HcDM6fTk5Usm6bx3mtJUZnN/view?usp=sharing).

---

# 🚀 Planejamento de Sprints - GymApp

Esta parte do documento detalha o planejamento de desenvolvimento do aplicativo **GymApp** durante o semestre, dividido em sprints semanais. A cada sprint, serão entregues partes específicas da aplicação conforme o escopo definido no projeto.

## 📅 Sprint 1: Setup inicial + Autenticação

**Duração:** 2 semanas 
**Objetivo:** Estruturar o projeto, configurar autenticação e telas iniciais.

### Tarefas:
- [ ] Criar repositório no GitHub
- [ ] Criar os protótipos de tela da aplicação no Figma
- [ ] Criar projeto com Expo + TypeScript
- [ ] Implementar Tela de Boas-Vindas
- [ ] Implementar Telas de Login e Cadastro
- [ ] Configurar Firebase Authentication
- [ ] Validação de formulários e exibição de mensagens de erro/feedback
- [ ] Navegação condicional com base na autenticação (usuário logado/não logado)

---

## 📅 Sprint 2: Tela Inicial + Navegação

**Duração:** 1 semana  
**Objetivo:** Criar estrutura de navegação e exibir informações iniciais do usuário.

### Tarefas:
- [ ] Criar estrutura de navegação (stack + drawer/vertical menu)
- [ ] Implementar Tela Inicial
- [ ] Estilizar menu vertical com ícones e acesso às telas principais

---

## 📅 Sprint 3: Treinos

**Duração:** 1 semana  
**Objetivo:** Permitir ao usuário criar treinos personalizados e registrar treinos do dia.

### Tarefas:
- [ ] Implementar Tela de Criação de treinos
- [ ] Implementar Tela de Treinos
- [ ] Listar os exercícios do dia com séries, repetições e pesos
- [ ] Filtrar treinos por categoria

---

## 📅 Sprint 4: Progresso

**Duração:** 1 semana  
**Objetivo:**  Visualizar estatísticas de evolução e recordes.

### Tarefas:
- [ ] Listar treinos anteriores
- [ ] Tela de progresso com gráfico de evolução de peso corporal
- [ ] Exibir recordes por exercício (maior carga levantada)
- [ ] Integração com base de dados do usuário

---

## 📅 Sprint 5: Atividade

**Duração:** 1 semana  
**Objetivo:** Mostrar um resumo da frequência de treinos e atividade geral do usuário.

### Tarefas:
- [ ] Contagem de treinos realizados no mês
- [ ] Dias frequentados exibidos em calendário
- [ ] Exibir tempo médio de treino por sessão (opcional)

---

## 📅 Sprint 6: Perfil + Configurações

**Duração:** 1 semana  
**Objetivo:** Permitir ao usuário editar seu perfil e configurar preferências.

### Tarefas:
- [ ] Tela de perfil com nome, foto, e-mail e objetivos
- [ ] Tela de configurações com opções:
  - Tema (claro/escuro)
  - Notificações
  - Logout

---

## 📅 Sprint 7: Testes e Refatoração

**Duração:** 1 semana  
**Objetivo:** Garantir estabilidade, performance e visual final.

### Tarefas:
- [ ] Revisar e testar todas as telas
- [ ] Corrigir bugs e comportamentos inesperados
- [ ] Testar fluxo completo do usuário
- [ ] Atualizar checklist de funcionalidades no `README.md`

---

## ✅ Observações finais

- A cada sprint serão feitas *commits* diários para acompanhar a evolução.
- Após cada sprint, será atualizado o progresso no `README.md` principal.
- Alterações no escopo serão documentadas e reorganizadas em sprints futuras se necessário.

---

## 🧩 Sprints Adicionais (funcionalidades extras)

Estas sprints representam melhorias que **não fazem parte do escopo mínimo obrigatório**, mas podem ser implementadas caso as funcionalidades prioritárias sejam concluídas com sucesso e dentro do prazo.

### 📅 Sprint Extra 1: Funcionalidades adicionais
**Duração:** 2 semanas  
**Objetivo:** Implementar funcionalidades adicionais
...


