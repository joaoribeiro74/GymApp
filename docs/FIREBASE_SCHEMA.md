# Firestore Database Schema

Este documento descreve o esquema das coleções e documentos armazenados no Firestore para este projeto.

---

## Coleção: exercises

| Campo    | Tipo   | Descrição                     |
| -------- | ------ | -----------------------------|
| id       | string | ID do documento no Firestore  |
| category | string | Categoria do exercício (ex: "Peito") |
| exercise | string | Nome do exercício (ex: "Supino Inclinado com Barra") |

---

## Coleção: users

Cada documento representa um usuário e possui os seguintes campos:

| Campo          | Tipo           | Descrição                      |
| -------------- | -------------- | ------------------------------|
| id             | string         | ID do usuário (Firestore UID) |
| email          | string         | Email do usuário               |
| username       | string         | Nome de usuário                |
| avatar         | string (opcional) | URL da imagem de perfil        |
| height         | number (opcional) | Altura do usuário (em metros)  |
| weight         | number (opcional) | Peso atual do usuário          |
| goal           | string (opcional) | Objetivo do usuário            |
| weightHistory  | array (opcional) | Histórico de pesos             |

### Estrutura do campo weightHistory

Array de objetos com:

| Campo  | Tipo   | Descrição                  |
| ------ | ------ | --------------------------|
| date   | string | Data do registro           |
| weight | number | Peso registrado            |

---

### Subcoleção: WorkoutTemplates

Cada documento representa um template de treino:

| Campo     | Tipo         | Descrição                             |
| --------- | ------------ | ----------------------------------- |
| id        | string       | ID do template                       |
| day       | array[string]| Dia(s) da semana do treino (ex: ["TERÇA-FEIRA"]) |
| name      | string       | Nome do treino                      |
| exercises | array        | Lista de exercícios do treino       |

#### Estrutura do array exercises em WorkoutTemplates

Array de objetos com:

| Campo    | Tipo   | Descrição                                 |
| -------- | ------ | -----------------------------------------|
| id       | string | ID do exercício (referência à coleção exercises) |
| category | string | Categoria do exercício                     |
| exercise | string | Nome do exercício                          |

---

### Subcoleção: WorkoutLogs

Cada documento representa um registro de treino realizado:

| Campo     | Tipo      | Descrição                            |
| --------- | --------- | -----------------------------------|
| id        | string    | ID do registro                      |
| workoutId | string    | ID do template associado (WorkoutTemplates) |
| name      | string    | Nome do treino realizado            |
| date      | timestamp | Data do treino                      |
| notes     | string (opcional) | Anotações adicionais          |
| exercises | array     | Lista de exercícios realizados      |

#### Estrutura do array exercises em WorkoutLogs

Array de objetos com:

| Campo      | Tipo    | Descrição                              |
| ---------- | ------- | -------------------------------------|
| exerciseId | string  | ID do exercício (referência à coleção exercises) |
| exercise   | string  | Nome do exercício                      |
| series     | number  | Número de séries                      |
| reps       | array[string] | Lista de repetições por série      |
| weights    | array[string] | Lista de pesos usados por série    |

---

## Observações

- Campos marcados como (opcional) podem não estar presentes em todos os documentos.
- O campo id normalmente corresponde ao ID do documento gerado automaticamente pelo Firestore.

---

Esse documento pode ser atualizado conforme novas funcionalidades e mudanças no banco de dados ocorram.

---