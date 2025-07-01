# 💪 GymApp 

## 🧾 Sobre o app

**GymApp** é um aplicativo de academia voltado para aqueles que desejam acompanhar seus treinos, progresso físico e desempenho ao longo do tempo. O app possibilita a criação e acompanhamento de treinos personalizados, visualização de estatísticas de progresso e gerenciamento do perfil do usuário.


## 🧑‍💻 Como rodar o projeto

### Pré-requisitos

- Node.js instalado
- Yarn instalado:

### Clonar o repositório

```bash
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo
```

### Instalar dependências

```bash
yarn
```

### Iniciar o projeto

```bash
yarn start
```

### Configurar o Firebase

```bash
Criar o arquivo firebaseConfig.ts e colocar as credenciais
```

---


### ✔️ Funcionalidades básicas (prioritárias)

- [x] Tela de Boas-Vindas
  - [x] Logo do App
  - [x] Mensagem de Boas-Vindas
  - [x] Redirecionamento para login
- [x] Tela de Cadastro
  - [x] Campos de e-mail, nome de usuário e senha
  - [x] Botão de Cadastro
  - [x] Link para redirecionamento ao login, caso já tenha cadastro
  - [x] Validação de dados
- [x] Tela de Login
  - [x] Campos de e-mail ou nome de usuário e senha
  - [x] Links para redirecionamento ao cadastro e trocar senha
  - [x] Botão de Login
  - [x] Validação + feedback de erro
- [x] Tela Inicial
  - [x] Saudação personalizada ("Bom dia, João!")
  - [x] Resumo do Próximo treino (nome do treino, dia)
  - [x] Resumo do progresso (último recorde, peso atual, gráfico miniatura)
  - [x] Botão para criar treino
  - [x] Menu lateral com ícones para outras telas
- [x] Tela de Criação de Treinos
  - [x] Campo para nome do treino
  - [x] Seletor de categoria (Peito, Costas, Pernas...)
  - [x] Botão para adicionar exercício
  - [x] Botão para salvar treino
- [x] Tela de Treinos
  - [x] Lista de treinos existentes
  - [x] Botão para verificar os treinos
  - [x] Para o treino do dia, mostras exercícios em sequência
  - [x] Para cada exercício, colocar o número de séries, número de repetições em cada série, peso e colocar notas ou observações
  - [x] Botões de concluir série e finalizar treino
- [x] Tela de Progresso
  - [x] Gráfico de evolução de peso corporal
  - [x] Recordes de peso por exercício
- [x] Tela de Atividade
  - [x] Calendário com dias de treino marcados
  - [x] Quantidade de treinos no mês atual
  - [x] Média de treinos por semana
  - [x] Botão para ver detalhes de um dia específico
- [x] Tela de Perfil
  - [x] Foto do usuário (avatar ou real)
  - [x] Nome de usuário
  - [x] E-mail
  - [x] Peso atual (editável)
  - [x] Objetivo: perder peso, ganhar massa, etc
  - [x] Botão de editar perfil
- [x] Tela de Configurações
  - [x] Alterar nome de usuário
  - [x] Redefinir senha
  - [x] Tema (claro/escuro)
  - [x] Versão
- [x] Mensagens de Erro ou Feedback
  - [x] Exibição de mensagens de erro
  - [x] Feedbacks: "Treino salvo com sucesso", "Senha incorreta", etc

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

## 📹 Demonstração em Vídeo

📽️ [Clique aqui para assistir à demonstração do app](https://drive.google.com/file/d/1DuWxhnXv5z8x5lbBMlWjZui95g8r8aMD/view?usp=sharing)  

---

# 🚀 Planejamento de Sprints - GymApp

Esta parte do documento detalha o planejamento de desenvolvimento do aplicativo **** durante o semestre, dividido em sprints semanais. A cada sprint, serão entregues partes específicas da aplicação conforme o escopo definido no projeto.

## 📅 Sprint 1: Setup inicial + Autenticação

**Duração:** 2 semanas 
**Objetivo:** Estruturar o projeto, configurar autenticação, implementar as telas iniciais, criar estrutura de navegação e exibir informações iniciais do usuário.

### Tarefas:
- [x] Criar repositório no GitHub
- [x] Criar os protótipos de tela da aplicação no Figma
- [x] Criar projeto com Expo + TypeScript
- [x] Implementar Tela de Boas-Vindas
- [x] Implementar Telas de Login e Cadastro
- [x] Configurar Firebase Authentication
- [x] Validação de formulários e exibição de mensagens de erro/feedback
- [x] Navegação condicional com base na autenticação (usuário logado/não logado)
- [x] Criar estrutura de navegação (stack + drawer/vertical menu)
- [x] Implementar Tela Inicial
- [x] Estilizar menu vertical com ícones e acesso às telas principais

---

## 📅 Sprint 2: Treinos

**Duração:** 1 semana  
**Objetivo:** Permitir ao usuário criar treinos personalizados e registrar treinos do dia.

### Tarefas:
- [x] Implementar Tela de Criação de treinos
- [x] Implementar Tela de Treinos
- [x] Listar os exercícios do dia com séries, repetições e pesos
- [x] Filtrar treinos por categoria

---

## 📅 Sprint 3: Progresso

**Duração:** 1 semana  
**Objetivo:**  Visualizar estatísticas de evolução e recordes.

### Tarefas:
- [x] Tela de progresso com gráfico de evolução de peso corporal
- [x] Exibir recordes por exercício (maior carga levantada)
- [x] Integração com base de dados do usuário

---

## 📅 Sprint 4: Atividade

**Duração:** 1 semana  
**Objetivo:** Mostrar um resumo da frequência de treinos e atividade geral do usuário.

### Tarefas:
- [x] Calendário com dias de treino marcados
- [x] Quantidade de treinos no mês atual
- [x] Média de treinos por semana
- [x] Botão para ver detalhes de um dia específico

---

## 📅 Sprint 5: Perfil + Configurações

**Duração:** 1 semana  
**Objetivo:** Permitir ao usuário editar seu perfil e configurar preferências.

### Tarefas:
- [x] Tela de Perfil
  - [x] Foto do usuário (avatar ou real)
  - [x] Nome de usuário
  - [x] E-mail
  - [x] Peso atual (editável)
  - [x] Objetivo: perder peso, ganhar massa, etc
  - [x] Botão de editar perfil
- [x] Tela de Configurações
  - [x] Alterar nome de usuário
  - [x] Redefinir senha
  - [x] Tema (claro/escuro)
  - [x] Versão

---

## 📅 Sprint 6: Testes e Refatoração

**Duração:** 1 semana  
**Objetivo:** Garantir estabilidade, performance e visual final.

### Tarefas:
- [x] Revisar e testar todas as telas
- [x] Corrigir bugs e comportamentos inesperados
- [x] Testar fluxo completo do usuário
- [x] Atualizar checklist de funcionalidades no `README.md`

---

## ✅ Observações finais

- A cada sprint serão feitas *commits* diários para acompanhar a evolução.
- Após cada sprint, será atualizado o progresso no `README.md` principal.
- Alterações no escopo serão documentadas e reorganizadas em sprints futuras se necessário.

---

## 🆕 Atualizações desde o último checkpoint

### ✅ Recursos dos módulos anteriores aplicados:

- **NativeWind** utilizado para estilizar todas as telas criadas até o momento.
- **Drawer e Stack** utilizados para fazer um fluxo de autenticação, de modo que o usuário tenha uma área pública gerenciada por um navegador Stack, e que ao fazer login ele seja redirecionado para uma área com navegação Drawer.
- **Mocks** utilizado para popular a tela inicial pós-autenticação.

### ♻️ Boas práticas aplicadas:

- **Isolamento de componentes reutilizáveis**: como `StyledButton`, `Loading`, `ProgressWeight`, `CustomToast`. Utilizado em telas de login, registro e na tela inicial.
- **Nomenclaturas minimalistas e descritivas**: `CustomDrawer`, `login`, `register`.
- **Parametrização de componentes**: `StyledButton({ onPress, title, variant })`.
- **Componentes que recebem filhos**: `StyledButton({ children })`. Utilizado na tela inicial para modificar o botão em comparação aos de login e registro.
- **Uso de mocks**: Utilizado na tela inicial para popular e ajudar no desenvolvimento.
