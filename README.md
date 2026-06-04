# Sistema de Avaliação CARAT — DS Turma 2 Grupo 5

## Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- npm (incluído com o Node.js)
- Git

---

## Instalação e execução

### 1. Clonar o repositório

```bash
git clone https://github.com/catarinafaria16/DS_turma2_grupo5.git
cd DS_turma2_grupo5
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Iniciar o servidor em modo de desenvolvimento

```bash
npm run dev
```

O servidor arranca em **http://localhost:3000**.

Na primeira execução, a base de dados (`database.db`) é criada automaticamente e populada com dados de teste.

---

## Acesso à aplicação

Abrir o browser em:

```
http://localhost:3000/app.html
```

### Credenciais de teste

| Perfil | ID | Password |
|--------|----|----------|
| Administrador | 1001 | pass1001 |
| Médico | 2001 | pass2001 |
| Utente | 3001 | pass3001 |

> Todos os utilizadores de teste seguem o padrão `password = pass<id>`. Ver `src/data/dadosTeste.ts` para a lista completa.

---

## Estrutura do projeto

```
src/
├── app.ts                  # Ponto de entrada do servidor
├── config/                 # Configurações da aplicação
├── controller/             # Controllers Express
├── database/               # Configuração do TypeORM (data-source.ts)
├── data/                   # Dados de teste (seed)
├── dtos/                   # Data Transfer Objects
├── enums/                  # Enumerações do domínio
├── fhir/                   # Mappers para recursos HL7 FHIR R4
├── middleware/             # Autenticação JWT e controlo de perfis
├── models/                 # Entidades TypeORM
├── routes/                 # Definição de rotas
├── services/               # Lógica de negócio
└── utils/                  # Utilitários (ex: validação de enums)

public/
├── app.html                # Interface web (frontend React)
└── index.html              # Página de login

postman/                    # Coleção de testes de integração Postman
```

---

## Scripts disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor em modo watch (recarrega automaticamente) |
| `npm run build` | Compila o TypeScript para JavaScript em `dist/` |
| `npm start` | Inicia o servidor a partir do build compilado |

---

## API — Endpoints principais

Todos os endpoints (exceto `/api/login`) requerem autenticação via header:

```
Authorization: Bearer <token>
```

O token é obtido através de `POST /api/login` com `{ id, password }`.

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/login` | Autenticação |
| GET/POST | `/api/utilizadores` | Gestão de utilizadores |
| GET/POST | `/api/utentes` | Gestão de utentes |
| GET/POST | `/api/medicos` | Gestão de médicos |
| GET/POST | `/api/prescricoes` | Prescrições |
| GET/POST | `/api/exames` | Exames |
| GET/POST | `/api/sintomas` | Sintomas |
| GET/POST | `/api/anamneses` | Anamneses |
| GET/POST | `/api/alertas` | Alertas clínicos |
| GET/POST | `/api/regras-alerta` | Regras de alerta |
| GET/POST | `/api/avaliacoes-carat` | Templates de avaliação CARAT |
| GET/POST | `/api/respostas-carat` | Respostas ao questionário CARAT |
| GET/POST | `/api/planos-acompanhamento` | Planos de acompanhamento |
| GET | `/api/auditoria` | Registos de auditoria (admin) |
| GET | `/api/dashboard/:utenteId` | Dashboard clínico do utente |
| GET | `/fhir/Patient` | Recurso FHIR Patient |
| GET | `/fhir/AllergyIntolerance` | Recurso FHIR AllergyIntolerance |
| GET | `/fhir/MedicationRequest` | Recurso FHIR MedicationRequest |
| GET | `/fhir/Observation` | Recurso FHIR Observation |

---

## Testes de integração (Postman)

A coleção de testes encontra-se na pasta `postman/`. Para a importar:

1. Abrir o Postman
2. **Import** → selecionar o ficheiro da pasta `postman/`
3. Executar os pedidos na ordem apresentada (o login deve ser executado primeiro para obter o token)

---

## Reiniciar a base de dados

Para repor os dados de teste ao estado inicial, apagar o ficheiro `database.db` e reiniciar o servidor:

```bash
# Windows (PowerShell)
Remove-Item database.db
npm run dev

# macOS / Linux
rm database.db
npm run dev
```

A base de dados será recriada automaticamente com todos os dados de teste.
