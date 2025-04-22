# React-Node Studies

> Projeto de estudos integrando **Node.js**, **Express** e **MongoDB** com autenticação via **Passport Local** e **JWT**.

## 🗂 Estrutura do Projeto


> **Obs:** a estrutura em camadas ajuda a manter o código organizado e escalável :contentReference[oaicite:1]{index=1}.

## 🚀 Tecnologias

- **Node.js** e **Express** para o servidor HTTP  
- **MongoDB** (driver nativo) para persistência de dados  
- **dotenv** para variáveis de ambiente (MONGO_CS, MONGO_DB_NAME) :contentReference[oaicite:2]{index=2}  
- **cors** para habilitar requisições cross‑origin  
- **Passport Local** + **crypto** para hashing seguro de senhas  
- **JWT** (jsonwebtoken) para emissão de tokens de autenticação  

## 🔧 Pré‑requisitos

- Node.js ≥ 14  
- MongoDB (local ou Atlas)  
- Arquivo `.env` com:

---

## 📓 Notas de Estudo

- **Node.js**  
  É um ambiente de execução JavaScript open‑source e cross‑platform, baseado no motor V8 do Chrome. Permite rodar código JS fora do navegador com alta performance e arquitetura orientada a eventos, ideal para construir aplicações de rede escaláveis.

- **Express**  
  Framework minimalista e flexível para Node.js, que fornece um conjunto robusto de recursos (middleware, roteamento, utilitários HTTP) sem ocultar as funcionalidades nativas do Node. Facilita a criação rápida de APIs e aplicações web.

- **MongoDB (driver nativo)**  
  Biblioteca oficial para conectar e interagir com bancos MongoDB usando JavaScript/TypeScript. Oferece API assíncrona baseada em Promises ou callbacks, com suporte a CRUD completo, transações e pooling de conexões.

- **dotenv**  
  Módulo zero‑dependências que carrega variáveis de ambiente de um arquivo `.env` para `process.env`, seguindo a metodologia The Twelve‑Factor App. Isola configurações sensíveis do código-fonte.

- **Passport Local + crypto**  
  Estratégia de autenticação que valida usuário e senha via callback de verificação. Geralmente usa `crypto` para hash seguro de senhas antes de armazenar/comparar. Integra‑se facilmente ao Express como middleware.

- **JWT (jsonwebtoken)**  
  Padrão aberto (RFC 7519) para tokens compactos e auto‑contidos, usados para transmitir informações assinadas digitalmente (HMAC ou RSA/ECDSA). Permite autenticação stateless em APIs RESTful.

- **cors**  
  Middleware para habilitar CORS em apps Connect/Express, controlando quais origens podem acessar seus recursos e configurando cabeçalhos preflight conforme necessidade.

> **Obs:** a estrutura em camadas ajuda a manter o código organizado e escalável :contentReference[oaicite:1]{index=1}.

## 🚀 Tecnologias

- **Node.js** e **Express** para o servidor HTTP  
- **MongoDB** (driver nativo) para persistência de dados  
- **dotenv** para variáveis de ambiente (MONGO_CS, MONGO_DB_NAME) :contentReference[oaicite:2]{index=2}  
- **cors** para habilitar requisições cross‑origin  
- **Passport Local** + **crypto** para hashing seguro de senhas  
- **JWT** (jsonwebtoken) para emissão de tokens de autenticação  




