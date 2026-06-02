import { PerfilUtilizador } from '../enums/PerfilUtilizador.enum.js';
import { GeneroUtilizador } from '../enums/GeneroUtilizador.enum.js';
import { RespostaCarat1a9 as R } from '../enums/RespostaCarat1a9.enum.js';
import { RespostaCarat10 as R10 } from '../enums/RespostaCarat10.enum.js';
import { TipoPrescricao } from '../enums/TipoPrescricao.enum.js';
import { EstadoPrescricao } from '../enums/EstadoPrescricao.enum.js';
import { TipoExame } from '../enums/TipoExame.enum.js';
import { EstadoExame } from '../enums/EstadoExame.enum.js';
import { IntensidadeSintoma } from '../enums/IntensidadeSintoma.enum.js';
import { Tabagismo } from '../enums/Tabagismo.enum.js';
import { SexoAnamnese } from '../enums/SexoAnamnese.enum.js';
import { IntensidadeCriseAlergia } from '../enums/IntensidadeCriseAlergia.enum.js';
import { TipoAlerta } from '../enums/TipoAlerta.enum.js';
import { EstadoAlerta } from '../enums/EstadoAlerta.enum.js';
import { PrioridadeRegraAlerta } from '../enums/PrioridadeRegraAlerta.enum.js';
import { EstadoPlanoAcompanhamento } from '../enums/EstadoPlanoAcompanhamento.enum.js';
import { OperacaoAuditoria } from '../enums/OperacaoAuditoria.enum.js';

// ─────────────────────────────────────────────────────────────
//  UTILIZADORES
//  Admins: 2026001–2026005 | Médicos: 2026101–2026105
//  Utentes: 2026201–2026230 | password = pass<id>
// ─────────────────────────────────────────────────────────────
export const testeUtilizadores = [
    { id: 2026001, nome: 'Luana Gaspar',     email: 'luana.gaspar@administrador.pt',   password: 'pass2026001', perfil: PerfilUtilizador.ADMINISTRADOR, genero: GeneroUtilizador.FEMININO },
    { id: 2026002, nome: 'Bruno Almeida',    email: 'bruno.almeida@administrador.pt',  password: 'pass2026002', perfil: PerfilUtilizador.ADMINISTRADOR, genero: GeneroUtilizador.MASCULINO },
    { id: 2026003, nome: 'Carla Mendes',     email: 'carla.mendes@administrador.pt',   password: 'pass2026003', perfil: PerfilUtilizador.ADMINISTRADOR, genero: GeneroUtilizador.FEMININO },
    { id: 2026004, nome: 'Diogo Pereira',    email: 'diogo.pereira@administrador.pt',  password: 'pass2026004', perfil: PerfilUtilizador.ADMINISTRADOR, genero: GeneroUtilizador.MASCULINO },
    { id: 2026005, nome: 'Eva Rodrigues',    email: 'eva.rodrigues@administrador.pt',  password: 'pass2026005', perfil: PerfilUtilizador.ADMINISTRADOR, genero: GeneroUtilizador.FEMININO, deleted_at: new Date('2026-05-01') },
    { id: 2026101, nome: 'Marta Silva',      email: 'marta.silva@medico.pt',     password: 'pass2026101', perfil: PerfilUtilizador.MEDICO, genero: GeneroUtilizador.FEMININO },
    { id: 2026102, nome: 'Pedro Costa',      email: 'pedro.costa@medico.pt',     password: 'pass2026102', perfil: PerfilUtilizador.MEDICO, genero: GeneroUtilizador.MASCULINO },
    { id: 2026103, nome: 'Ines Almeida',     email: 'ines.almeida@medico.pt',    password: 'pass2026103', perfil: PerfilUtilizador.MEDICO, genero: GeneroUtilizador.FEMININO },
    { id: 2026104, nome: 'Tiago Ferreira',   email: 'tiago.ferreira@medico.pt',  password: 'pass2026104', perfil: PerfilUtilizador.MEDICO, genero: GeneroUtilizador.MASCULINO },
    { id: 2026105, nome: 'Sofia Ribeiro',    email: 'sofia.ribeiro@medico.pt',   password: 'pass2026105', perfil: PerfilUtilizador.MEDICO, genero: GeneroUtilizador.FEMININO },
    { id: 2026201, nome: 'Ana Ferreira',     email: 'ana.ferreira@utente.pt',    password: 'pass2026201', perfil: PerfilUtilizador.UTENTE, genero: GeneroUtilizador.FEMININO },
    { id: 2026202, nome: 'Bruno Costa',      email: 'bruno.costa@utente.pt',     password: 'pass2026202', perfil: PerfilUtilizador.UTENTE, genero: GeneroUtilizador.MASCULINO },
    { id: 2026203, nome: 'Carla Dias',       email: 'carla.dias@utente.pt',      password: 'pass2026203', perfil: PerfilUtilizador.UTENTE, genero: GeneroUtilizador.FEMININO },
    { id: 2026204, nome: 'David Melo',       email: 'david.melo@utente.pt',      password: 'pass2026204', perfil: PerfilUtilizador.UTENTE, genero: GeneroUtilizador.MASCULINO },
    { id: 2026205, nome: 'Elena Pires',      email: 'elena.pires@utente.pt',     password: 'pass2026205', perfil: PerfilUtilizador.UTENTE, genero: GeneroUtilizador.FEMININO },
    { id: 2026206, nome: 'Fernando Sousa',   email: 'fernando.sousa@utente.pt',  password: 'pass2026206', perfil: PerfilUtilizador.UTENTE, genero: GeneroUtilizador.MASCULINO },
    { id: 2026207, nome: 'Gabriela Lima',    email: 'gabriela.lima@utente.pt',   password: 'pass2026207', perfil: PerfilUtilizador.UTENTE, genero: GeneroUtilizador.FEMININO },
    { id: 2026208, nome: 'Henrique Nunes',   email: 'henrique.nunes@utente.pt',  password: 'pass2026208', perfil: PerfilUtilizador.UTENTE, genero: GeneroUtilizador.MASCULINO },
    { id: 2026209, nome: 'Ines Carvalho',    email: 'ines.carvalho@utente.pt',   password: 'pass2026209', perfil: PerfilUtilizador.UTENTE, genero: GeneroUtilizador.FEMININO },
    { id: 2026210, nome: 'Jorge Santos',     email: 'jorge.santos@utente.pt',    password: 'pass2026210', perfil: PerfilUtilizador.UTENTE, genero: GeneroUtilizador.MASCULINO },
    { id: 2026211, nome: 'Katarina Lopes',   email: 'katarina.lopes@utente.pt',  password: 'pass2026211', perfil: PerfilUtilizador.UTENTE, genero: GeneroUtilizador.FEMININO },
    { id: 2026212, nome: 'Luis Monteiro',    email: 'luis.monteiro@utente.pt',   password: 'pass2026212', perfil: PerfilUtilizador.UTENTE, genero: GeneroUtilizador.MASCULINO },
    { id: 2026213, nome: 'Marta Rodrigues',  email: 'marta.rodrigues@utente.pt', password: 'pass2026213', perfil: PerfilUtilizador.UTENTE, genero: GeneroUtilizador.FEMININO },
    { id: 2026214, nome: 'Nuno Ferreira',    email: 'nuno.ferreira@utente.pt',   password: 'pass2026214', perfil: PerfilUtilizador.UTENTE, genero: GeneroUtilizador.MASCULINO },
    { id: 2026215, nome: 'Olga Pereira',     email: 'olga.pereira@utente.pt',    password: 'pass2026215', perfil: PerfilUtilizador.UTENTE, genero: GeneroUtilizador.FEMININO },
    { id: 2026216, nome: 'Paulo Ribeiro',    email: 'paulo.ribeiro@utente.pt',   password: 'pass2026216', perfil: PerfilUtilizador.UTENTE, genero: GeneroUtilizador.MASCULINO },
    { id: 2026217, nome: 'Rita Gomes',       email: 'rita.gomes@utente.pt',      password: 'pass2026217', perfil: PerfilUtilizador.UTENTE, genero: GeneroUtilizador.FEMININO },
    { id: 2026218, nome: 'Sergio Antunes',   email: 'sergio.antunes@utente.pt',  password: 'pass2026218', perfil: PerfilUtilizador.UTENTE, genero: GeneroUtilizador.MASCULINO },
    { id: 2026219, nome: 'Tania Correia',    email: 'tania.correia@utente.pt',   password: 'pass2026219', perfil: PerfilUtilizador.UTENTE, genero: GeneroUtilizador.FEMININO },
    { id: 2026220, nome: 'Ulisses Figueira', email: 'ulisses.figueira@utente.pt',password: 'pass2026220', perfil: PerfilUtilizador.UTENTE, genero: GeneroUtilizador.MASCULINO },
    { id: 2026221, nome: 'Vera Moreira',     email: 'vera.moreira@utente.pt',    password: 'pass2026221', perfil: PerfilUtilizador.UTENTE, genero: GeneroUtilizador.FEMININO },
    { id: 2026222, nome: 'Xavier Rocha',     email: 'xavier.rocha@utente.pt',    password: 'pass2026222', perfil: PerfilUtilizador.UTENTE, genero: GeneroUtilizador.MASCULINO },
    { id: 2026223, nome: 'Yolanda Alves',    email: 'yolanda.alves@utente.pt',   password: 'pass2026223', perfil: PerfilUtilizador.UTENTE, genero: GeneroUtilizador.FEMININO },
    { id: 2026224, nome: 'Zelio Martins',    email: 'zelio.martins@utente.pt',   password: 'pass2026224', perfil: PerfilUtilizador.UTENTE, genero: GeneroUtilizador.MASCULINO },
    { id: 2026225, nome: 'Alice Mendes',     email: 'alice.mendes@utente.pt',    password: 'pass2026225', perfil: PerfilUtilizador.UTENTE, genero: GeneroUtilizador.FEMININO },
    { id: 2026226, nome: 'Bernardo Silva',   email: 'bernardo.silva@utente.pt',  password: 'pass2026226', perfil: PerfilUtilizador.UTENTE, genero: GeneroUtilizador.MASCULINO },
    { id: 2026227, nome: 'Catia Ramos',      email: 'catia.ramos@utente.pt',     password: 'pass2026227', perfil: PerfilUtilizador.UTENTE, genero: GeneroUtilizador.FEMININO },
    { id: 2026228, nome: 'Dario Couto',      email: 'dario.couto@utente.pt',     password: 'pass2026228', perfil: PerfilUtilizador.UTENTE, genero: GeneroUtilizador.MASCULINO },
    { id: 2026229, nome: 'Elisa Teixeira',   email: 'elisa.teixeira@utente.pt',  password: 'pass2026229', perfil: PerfilUtilizador.UTENTE, genero: GeneroUtilizador.FEMININO },
    { id: 2026230, nome: 'Filipe Azevedo',   email: 'filipe.azevedo@utente.pt',  password: 'pass2026230', perfil: PerfilUtilizador.UTENTE, genero: GeneroUtilizador.MASCULINO },
];

export const testeAdministradores = [
    { id: 2026001, utilizador_id: 2026001 },
    { id: 2026002, utilizador_id: 2026002 },
    { id: 2026003, utilizador_id: 2026003 },
    { id: 2026004, utilizador_id: 2026004 },
    { id: 2026005, utilizador_id: 2026005, deleted_at: new Date('2026-05-01') },
];

export const testeMedicos = [
    { id: 2026101, utilizador_id: 2026101, especialidade: 'PNEUMOLOGIA',      contacto: '+351910000101' },
    { id: 2026102, utilizador_id: 2026102, especialidade: 'ALERGOLOGIA',      contacto: '+351910000102' },
    { id: 2026103, utilizador_id: 2026103, especialidade: 'IMUNOALERGOLOGIA', contacto: '+351910000103' },
    { id: 2026104, utilizador_id: 2026104, especialidade: 'MEDICINA INTERNA', contacto: '+351910000104' },
    { id: 2026105, utilizador_id: 2026105, especialidade: 'PEDIATRIA',        contacto: '+351910000105' },
];

// 6 utentes por médico, nr_utente = id
export const testeUtentes = [
    { id: 2026201, utilizador_id: 2026201, medico_id: 2026101, nr_utente: 2026201, data_nascimento: new Date('1980-03-15'), morada: 'Rua das Flores 10, Lisboa',        contacto: '+351910000201', nr_faturacao: 700201 },
    { id: 2026202, utilizador_id: 2026202, medico_id: 2026101, nr_utente: 2026202, data_nascimento: new Date('1995-07-22'), morada: 'Av. da Liberdade 55, Lisboa',      contacto: '+351910000202', nr_faturacao: 700202 },
    { id: 2026203, utilizador_id: 2026203, medico_id: 2026101, nr_utente: 2026203, data_nascimento: new Date('1970-11-08'), morada: 'Rua do Comercio 3, Setubal',       contacto: '+351910000203', nr_faturacao: 700203 },
    { id: 2026204, utilizador_id: 2026204, medico_id: 2026101, nr_utente: 2026204, data_nascimento: new Date('2000-01-30'), morada: 'Travessa da Saudade 7, Cascais',   contacto: '+351910000204', nr_faturacao: 700204 },
    { id: 2026205, utilizador_id: 2026205, medico_id: 2026101, nr_utente: 2026205, data_nascimento: new Date('1988-09-12'), morada: 'Largo do Chiado 2, Lisboa',        contacto: '+351910000205', nr_faturacao: 700205 },
    { id: 2026206, utilizador_id: 2026206, medico_id: 2026101, nr_utente: 2026206, data_nascimento: new Date('1960-05-27'), morada: 'Rua do Alecrim 18, Lisboa',        contacto: '+351910000206', nr_faturacao: 700206 },
    { id: 2026207, utilizador_id: 2026207, medico_id: 2026102, nr_utente: 2026207, data_nascimento: new Date('1990-02-14'), morada: 'Rua de Sta. Catarina 30, Porto',   contacto: '+351910000207', nr_faturacao: 700207 },
    { id: 2026208, utilizador_id: 2026208, medico_id: 2026102, nr_utente: 2026208, data_nascimento: new Date('1975-08-19'), morada: 'Praca da Batalha 12, Porto',       contacto: '+351910000208', nr_faturacao: 700208 },
    { id: 2026209, utilizador_id: 2026209, medico_id: 2026102, nr_utente: 2026209, data_nascimento: new Date('2004-12-05'), morada: 'Rua Formosa 9, Porto',             contacto: '+351910000209', nr_faturacao: 700209 },
    { id: 2026210, utilizador_id: 2026210, medico_id: 2026102, nr_utente: 2026210, data_nascimento: new Date('1983-04-21'), morada: 'Av. dos Aliados 77, Porto',        contacto: '+351910000210', nr_faturacao: 700210 },
    { id: 2026211, utilizador_id: 2026211, medico_id: 2026102, nr_utente: 2026211, data_nascimento: new Date('1998-10-03'), morada: 'Rua do Loureiro 5, Matosinhos',    contacto: '+351910000211', nr_faturacao: 700211 },
    { id: 2026212, utilizador_id: 2026212, medico_id: 2026102, nr_utente: 2026212, data_nascimento: new Date('1965-06-16'), morada: 'Largo do Pinheiro 8, Gaia',        contacto: '+351910000212', nr_faturacao: 700212 },
    { id: 2026213, utilizador_id: 2026213, medico_id: 2026103, nr_utente: 2026213, data_nascimento: new Date('1982-01-09'), morada: 'Rua da Sofia 45, Coimbra',         contacto: '+351910000213', nr_faturacao: 700213 },
    { id: 2026214, utilizador_id: 2026214, medico_id: 2026103, nr_utente: 2026214, data_nascimento: new Date('1993-07-28'), morada: 'Rua do Brasil 22, Coimbra',        contacto: '+351910000214', nr_faturacao: 700214 },
    { id: 2026215, utilizador_id: 2026215, medico_id: 2026103, nr_utente: 2026215, data_nascimento: new Date('1971-03-17'), morada: 'Av. Emidio Navarro 6, Coimbra',    contacto: '+351910000215', nr_faturacao: 700215 },
    { id: 2026216, utilizador_id: 2026216, medico_id: 2026103, nr_utente: 2026216, data_nascimento: new Date('2001-11-24'), morada: 'Rua Olimpio Nicolau 11, Leiria',   contacto: '+351910000216', nr_faturacao: 700216 },
    { id: 2026217, utilizador_id: 2026217, medico_id: 2026103, nr_utente: 2026217, data_nascimento: new Date('1986-08-31'), morada: 'Rua Dr. Francisco 3, Aveiro',      contacto: '+351910000217', nr_faturacao: 700217 },
    { id: 2026218, utilizador_id: 2026218, medico_id: 2026103, nr_utente: 2026218, data_nascimento: new Date('1955-02-07'), morada: 'Av. Lourenco Peixinho 44, Aveiro', contacto: '+351910000218', nr_faturacao: 700218 },
    { id: 2026219, utilizador_id: 2026219, medico_id: 2026104, nr_utente: 2026219, data_nascimento: new Date('1991-05-13'), morada: 'Rua de Sao Victor 18, Braga',      contacto: '+351910000219', nr_faturacao: 700219 },
    { id: 2026220, utilizador_id: 2026220, medico_id: 2026104, nr_utente: 2026220, data_nascimento: new Date('1977-09-04'), morada: 'Largo Carlos Amarante 5, Braga',   contacto: '+351910000220', nr_faturacao: 700220 },
    { id: 2026221, utilizador_id: 2026221, medico_id: 2026104, nr_utente: 2026221, data_nascimento: new Date('2003-06-20'), morada: 'Rua do Castelo 27, Guimaraes',     contacto: '+351910000221', nr_faturacao: 700221 },
    { id: 2026222, utilizador_id: 2026222, medico_id: 2026104, nr_utente: 2026222, data_nascimento: new Date('1968-12-11'), morada: 'Av. Conde Margaride 9, Guimaraes', contacto: '+351910000222', nr_faturacao: 700222 },
    { id: 2026223, utilizador_id: 2026223, medico_id: 2026104, nr_utente: 2026223, data_nascimento: new Date('1997-04-02'), morada: 'Rua de Camoes 13, Viana do Castelo',contacto: '+351910000223', nr_faturacao: 700223 },
    { id: 2026224, utilizador_id: 2026224, medico_id: 2026104, nr_utente: 2026224, data_nascimento: new Date('1963-10-18'), morada: 'Rua do Gontim 6, Viana do Castelo', contacto: '+351910000224', nr_faturacao: 700224 },
    { id: 2026225, utilizador_id: 2026225, medico_id: 2026105, nr_utente: 2026225, data_nascimento: new Date('2010-07-08'), morada: 'Rua do Farol 20, Faro',            contacto: '+351910000225', nr_faturacao: 700225 },
    { id: 2026226, utilizador_id: 2026226, medico_id: 2026105, nr_utente: 2026226, data_nascimento: new Date('2008-03-25'), morada: 'Av. da Republica 14, Faro',        contacto: '+351910000226', nr_faturacao: 700226 },
    { id: 2026227, utilizador_id: 2026227, medico_id: 2026105, nr_utente: 2026227, data_nascimento: new Date('2012-09-14'), morada: 'Rua Domingos Guieiro 7, Portimao', contacto: '+351910000227', nr_faturacao: 700227 },
    { id: 2026228, utilizador_id: 2026228, medico_id: 2026105, nr_utente: 2026228, data_nascimento: new Date('2015-01-30'), morada: 'Rua dos Pescadores 3, Lagos',      contacto: '+351910000228', nr_faturacao: 700228 },
    { id: 2026229, utilizador_id: 2026229, medico_id: 2026105, nr_utente: 2026229, data_nascimento: new Date('2011-11-22'), morada: 'Rua da Praia 15, Tavira',          contacto: '+351910000229', nr_faturacao: 700229 },
    { id: 2026230, utilizador_id: 2026230, medico_id: 2026105, nr_utente: 2026230, data_nascimento: new Date('2009-06-07'), morada: 'Av. da Liberdade 33, Olhao',       contacto: '+351910000230', nr_faturacao: 700230 },
];

// ─── PRESCRIÇÕES ─── cobre todos os estados e tipos
export const testePrescricoes = [
    { id: 5001, medico_id: 2026101, utente_id: 2026201, tipo: TipoPrescricao.MEDICACAO, data_emissao: new Date('2026-04-01'), data_validade: new Date('2026-07-01'), estado: EstadoPrescricao.ATIVA },
    { id: 5002, medico_id: 2026101, utente_id: 2026202, tipo: TipoPrescricao.EXAME,     data_emissao: new Date('2026-04-05'), data_validade: new Date('2026-07-05'), estado: EstadoPrescricao.ATIVA },
    { id: 5003, medico_id: 2026102, utente_id: 2026207, tipo: TipoPrescricao.MEDICACAO, data_emissao: new Date('2026-04-10'), data_validade: new Date('2026-07-10'), estado: EstadoPrescricao.ATIVA },
    { id: 5004, medico_id: 2026102, utente_id: 2026208, tipo: TipoPrescricao.EXAME,     data_emissao: new Date('2026-04-12'), data_validade: new Date('2026-07-12'), estado: EstadoPrescricao.ATIVA },
    { id: 5005, medico_id: 2026103, utente_id: 2026213, tipo: TipoPrescricao.MEDICACAO, data_emissao: new Date('2026-04-15'), data_validade: new Date('2026-07-15'), estado: EstadoPrescricao.ATIVA },
    { id: 5006, medico_id: 2026103, utente_id: 2026214, tipo: TipoPrescricao.EXAME,     data_emissao: new Date('2026-04-18'), data_validade: new Date('2026-07-18'), estado: EstadoPrescricao.ATIVA },
    { id: 5007, medico_id: 2026104, utente_id: 2026219, tipo: TipoPrescricao.MEDICACAO, data_emissao: new Date('2026-04-20'), data_validade: new Date('2026-07-20'), estado: EstadoPrescricao.ATIVA },
    { id: 5008, medico_id: 2026104, utente_id: 2026220, tipo: TipoPrescricao.EXAME,     data_emissao: new Date('2026-04-22'), data_validade: new Date('2026-07-22'), estado: EstadoPrescricao.ATIVA },
    { id: 5009, medico_id: 2026105, utente_id: 2026225, tipo: TipoPrescricao.MEDICACAO, data_emissao: new Date('2026-04-25'), data_validade: new Date('2026-07-25'), estado: EstadoPrescricao.ATIVA },
    { id: 5010, medico_id: 2026105, utente_id: 2026226, tipo: TipoPrescricao.EXAME,     data_emissao: new Date('2026-04-28'), data_validade: new Date('2026-07-28'), estado: EstadoPrescricao.ATIVA },
    { id: 5011, medico_id: 2026101, utente_id: 2026204, tipo: TipoPrescricao.EXAME,     data_emissao: new Date('2026-05-02'), data_validade: new Date('2026-08-02'), estado: EstadoPrescricao.ATIVA },
    { id: 5012, medico_id: 2026102, utente_id: 2026210, tipo: TipoPrescricao.MEDICACAO, data_emissao: new Date('2026-05-05'), data_validade: new Date('2026-08-05'), estado: EstadoPrescricao.ATIVA },
    { id: 5013, medico_id: 2026101, utente_id: 2026203, tipo: TipoPrescricao.MEDICACAO, data_emissao: new Date('2026-03-01'), data_validade: new Date('2026-06-01'), estado: EstadoPrescricao.DISPENSADA },
    { id: 5014, medico_id: 2026102, utente_id: 2026209, tipo: TipoPrescricao.MEDICACAO, data_emissao: new Date('2026-03-10'), data_validade: new Date('2026-06-10'), estado: EstadoPrescricao.DISPENSADA },
    { id: 5015, medico_id: 2026103, utente_id: 2026215, tipo: TipoPrescricao.EXAME,     data_emissao: new Date('2026-03-15'), data_validade: new Date('2026-06-15'), estado: EstadoPrescricao.DISPENSADA },
    { id: 5016, medico_id: 2026104, utente_id: 2026221, tipo: TipoPrescricao.MEDICACAO, data_emissao: new Date('2026-02-01'), data_validade: new Date('2026-05-01'), estado: EstadoPrescricao.CANCELADA },
    { id: 5017, medico_id: 2026105, utente_id: 2026227, tipo: TipoPrescricao.EXAME,     data_emissao: new Date('2026-02-15'), data_validade: new Date('2026-05-15'), estado: EstadoPrescricao.CANCELADA },
];

// ─── MEDICAÇÕES ───
export const testeMedicacoes = [
    { id: 6001, prescricao_id: 5001, nome: 'Budesonida',    dose: '200 mcg', duracao: '90 dias', periodicidade: '2x/dia' },
    { id: 6002, prescricao_id: 5003, nome: 'Montelucaste',  dose: '10 mg',   duracao: '60 dias', periodicidade: '1x/dia (noite)' },
    { id: 6003, prescricao_id: 5005, nome: 'Salbutamol',    dose: '100 mcg', duracao: 'SOS',     periodicidade: 'ate 4x/dia SOS' },
    { id: 6004, prescricao_id: 5007, nome: 'Tiotropio',     dose: '18 mcg',  duracao: '90 dias', periodicidade: '1x/dia' },
    { id: 6005, prescricao_id: 5009, nome: 'Fluticasona',   dose: '250 mcg', duracao: '60 dias', periodicidade: '2x/dia' },
    { id: 6006, prescricao_id: 5012, nome: 'Formoterol',    dose: '12 mcg',  duracao: '90 dias', periodicidade: '2x/dia' },
    { id: 6007, prescricao_id: 5013, nome: 'Cetirizina',    dose: '10 mg',   duracao: '30 dias', periodicidade: '1x/dia' },
    { id: 6008, prescricao_id: 5014, nome: 'Loratadina',    dose: '10 mg',   duracao: '30 dias', periodicidade: '1x/dia' },
    { id: 6009, prescricao_id: 5016, nome: 'Prednisolona',  dose: '20 mg',   duracao: '7 dias',  periodicidade: '1x/dia' },
];

// ─── EXAMES ─── cobre todos os estados e vários tipos
export const testeExames = [
    { id: 7001, prescricao_id: 5002,  tipo_exame: TipoExame.ESPIROMETRIA,          consentimento: true,  estado: EstadoExame.PENDENTE  },
    { id: 7002, prescricao_id: 5004,  tipo_exame: TipoExame.IGE_ESPECIFICA,        consentimento: true,  estado: EstadoExame.REALIZADO },
    { id: 7003, prescricao_id: 5006,  tipo_exame: TipoExame.TESTE_BRONCODILATADOR, consentimento: true,  estado: EstadoExame.ANALISADO },
    { id: 7004, prescricao_id: 5008,  tipo_exame: TipoExame.RADIOGRAFIA_TORACICA,  consentimento: true,  estado: EstadoExame.PENDENTE  },
    { id: 7005, prescricao_id: 5010,  tipo_exame: TipoExame.PICO_FLUXO,            consentimento: true,  estado: EstadoExame.REALIZADO },
    { id: 7006, prescricao_id: 5011,  tipo_exame: TipoExame.TAC_TORACICA,          consentimento: true,  estado: EstadoExame.ANALISADO },
    { id: 7007, prescricao_id: 5015,  tipo_exame: TipoExame.OXIMETRIA_NOTURNA,     consentimento: true,  estado: EstadoExame.ANALISADO },
    { id: 7008, prescricao_id: 5017,  tipo_exame: TipoExame.TESTE_ESFORCO,         consentimento: false, estado: EstadoExame.CANCELADO },
];

// ─── SINTOMAS ─── cobre todas as intensidades
export const testeSintomas = [
    { id: 8001, utente_id: 2026201, descricao: 'Dispneia aos esforcos moderados',   intensidade: IntensidadeSintoma.MODERADA, duracao: '3 semanas', data_registo: new Date('2026-05-10') },
    { id: 8002, utente_id: 2026201, descricao: 'Pieira noturna recorrente',          intensidade: IntensidadeSintoma.LIGEIRA,  duracao: '10 dias',   data_registo: new Date('2026-05-15') },
    { id: 8003, utente_id: 2026202, descricao: 'Tosse seca persistente',             intensidade: IntensidadeSintoma.MODERADA, duracao: '2 semanas', data_registo: new Date('2026-05-08') },
    { id: 8004, utente_id: 2026203, descricao: 'Dispneia em repouso',                intensidade: IntensidadeSintoma.GRAVE,    duracao: '4 dias',    data_registo: new Date('2026-05-20') },
    { id: 8005, utente_id: 2026204, descricao: 'Aperto toracico ao esforco',         intensidade: IntensidadeSintoma.LIGEIRA,  duracao: '1 semana',  data_registo: new Date('2026-05-12') },
    { id: 8006, utente_id: 2026207, descricao: 'Rinorreia abundante',                intensidade: IntensidadeSintoma.MODERADA, duracao: '2 semanas', data_registo: new Date('2026-05-05') },
    { id: 8007, utente_id: 2026207, descricao: 'Prurido nasal intenso',              intensidade: IntensidadeSintoma.LIGEIRA,  duracao: '1 semana',  data_registo: new Date('2026-05-07') },
    { id: 8008, utente_id: 2026208, descricao: 'Espirros em salva ao acordar',       intensidade: IntensidadeSintoma.MODERADA, duracao: '3 semanas', data_registo: new Date('2026-04-28') },
    { id: 8009, utente_id: 2026209, descricao: 'Conjuntivite alergica sazonal',      intensidade: IntensidadeSintoma.LIGEIRA,  duracao: '10 dias',   data_registo: new Date('2026-05-01') },
    { id: 8010, utente_id: 2026213, descricao: 'Urticaria apos contacto com latex',  intensidade: IntensidadeSintoma.GRAVE,    duracao: '2 dias',    data_registo: new Date('2026-05-18') },
    { id: 8011, utente_id: 2026214, descricao: 'Angioedema labial',                  intensidade: IntensidadeSintoma.GRAVE,    duracao: '1 dia',     data_registo: new Date('2026-05-22') },
    { id: 8012, utente_id: 2026215, descricao: 'Pieira pos-esforco',                 intensidade: IntensidadeSintoma.MODERADA, duracao: '5 dias',    data_registo: new Date('2026-05-14') },
    { id: 8013, utente_id: 2026219, descricao: 'Tosse cronica com expetoracao',      intensidade: IntensidadeSintoma.MODERADA, duracao: '1 mes',     data_registo: new Date('2026-04-20') },
    { id: 8014, utente_id: 2026220, descricao: 'Fadiga respiratoria progressiva',    intensidade: IntensidadeSintoma.GRAVE,    duracao: '3 semanas', data_registo: new Date('2026-05-02') },
    { id: 8015, utente_id: 2026221, descricao: 'Dispneia ao deitar',                 intensidade: IntensidadeSintoma.MODERADA, duracao: '2 semanas', data_registo: new Date('2026-05-16') },
    { id: 8016, utente_id: 2026225, descricao: 'Pieira noturna em crianca',          intensidade: IntensidadeSintoma.MODERADA, duracao: '1 semana',  data_registo: new Date('2026-05-19') },
    { id: 8017, utente_id: 2026226, descricao: 'Tosse seca apos exercicio escolar',  intensidade: IntensidadeSintoma.LIGEIRA,  duracao: '6 dias',    data_registo: new Date('2026-05-21') },
    { id: 8018, utente_id: 2026227, descricao: 'Espirros frequentes ao acordar',     intensidade: IntensidadeSintoma.LIGEIRA,  duracao: '2 semanas', data_registo: new Date('2026-05-11') },
];

// ─── ANAMNESES ─── 30 utentes, cobre todos os valores de Tabagismo
export const testeAnamneses = [
    { id: 9001, utente_id: 2026201, historico_familiar: 'Mae com asma alergica persistente.',           tabagismo: Tabagismo.NAO_FUMADOR,          sexo: SexoAnamnese.FEMININO  },
    { id: 9002, utente_id: 2026202, historico_familiar: 'Pai com bronquite cronica.',                   tabagismo: Tabagismo.EXPOSICAO_PASSIVA,     sexo: SexoAnamnese.MASCULINO },
    { id: 9003, utente_id: 2026203, historico_familiar: 'Irmao com DPOC diagnosticada.',                tabagismo: Tabagismo.EX_FUMADOR,            sexo: SexoAnamnese.FEMININO  },
    { id: 9004, utente_id: 2026204, historico_familiar: 'Sem antecedentes familiares relevantes.',       tabagismo: Tabagismo.OCASIONAL,             sexo: SexoAnamnese.MASCULINO },
    { id: 9005, utente_id: 2026205, historico_familiar: 'Avo com rinite alergica perene.',              tabagismo: Tabagismo.NAO_FUMADOR,            sexo: SexoAnamnese.FEMININO  },
    { id: 9006, utente_id: 2026206, historico_familiar: 'Pai fumador, mae com asma na infancia.',       tabagismo: Tabagismo.MENOS_10_CIGARROS_DIA, sexo: SexoAnamnese.MASCULINO },
    { id: 9007, utente_id: 2026207, historico_familiar: 'Mae com rinite sazonal e alergia a acaros.',   tabagismo: Tabagismo.NAO_FUMADOR,            sexo: SexoAnamnese.FEMININO  },
    { id: 9008, utente_id: 2026208, historico_familiar: 'Pai ex-fumador com DPOC ligeira.',              tabagismo: Tabagismo._10_A_20_CIGARROS_DIA, sexo: SexoAnamnese.MASCULINO },
    { id: 9009, utente_id: 2026209, historico_familiar: 'Familia com multiplas alergias ambientais.',   tabagismo: Tabagismo.EXPOSICAO_PASSIVA,     sexo: SexoAnamnese.FEMININO  },
    { id: 9010, utente_id: 2026210, historico_familiar: 'Pai com tabagismo intenso e DPOC avancada.',   tabagismo: Tabagismo.MAIS_20_CIGARROS_DIA,  sexo: SexoAnamnese.MASCULINO },
    { id: 9011, utente_id: 2026211, historico_familiar: 'Irma com asma alergica e eczema atopico.',     tabagismo: Tabagismo.EX_FUMADOR,            sexo: SexoAnamnese.FEMININO  },
    { id: 9012, utente_id: 2026212, historico_familiar: 'Sem antecedentes familiares significativos.',  tabagismo: Tabagismo.NAO_FUMADOR,            sexo: SexoAnamnese.MASCULINO },
    { id: 9013, utente_id: 2026213, historico_familiar: 'Mae com urticaria cronica espontanea.',         tabagismo: Tabagismo.EXPOSICAO_PASSIVA,     sexo: SexoAnamnese.FEMININO  },
    { id: 9014, utente_id: 2026214, historico_familiar: 'Pai com alergia a farmacos (penicilinas).',    tabagismo: Tabagismo.OCASIONAL,             sexo: SexoAnamnese.MASCULINO },
    { id: 9015, utente_id: 2026215, historico_familiar: 'Avo com sinusite cronica e rinite perene.',    tabagismo: Tabagismo.NAO_FUMADOR,            sexo: SexoAnamnese.FEMININO  },
    { id: 9016, utente_id: 2026216, historico_familiar: 'Pai com asma desde a infancia.',               tabagismo: Tabagismo.EX_FUMADOR,            sexo: SexoAnamnese.MASCULINO },
    { id: 9017, utente_id: 2026217, historico_familiar: 'Mae com dermatite de contacto e rinite.',       tabagismo: Tabagismo.NAO_FUMADOR,            sexo: SexoAnamnese.FEMININO  },
    { id: 9018, utente_id: 2026218, historico_familiar: 'Multiplos familiares fumadores.',               tabagismo: Tabagismo.EXPOSICAO_PASSIVA,     sexo: SexoAnamnese.MASCULINO },
    { id: 9019, utente_id: 2026219, historico_familiar: 'Irma com asma persistente moderada.',          tabagismo: Tabagismo.NAO_FUMADOR,            sexo: SexoAnamnese.FEMININO  },
    { id: 9020, utente_id: 2026220, historico_familiar: 'Pai com DPOC e tabagismo de longa data.',      tabagismo: Tabagismo.OCASIONAL,             sexo: SexoAnamnese.MASCULINO },
    { id: 9021, utente_id: 2026221, historico_familiar: 'Mae com rinite alergica sazonal.',              tabagismo: Tabagismo.EX_FUMADOR,            sexo: SexoAnamnese.FEMININO  },
    { id: 9022, utente_id: 2026222, historico_familiar: 'Sem antecedentes familiares relevantes.',       tabagismo: Tabagismo.EXPOSICAO_PASSIVA,     sexo: SexoAnamnese.MASCULINO },
    { id: 9023, utente_id: 2026223, historico_familiar: 'Pai com alergia a acaros e polens.',           tabagismo: Tabagismo.NAO_FUMADOR,            sexo: SexoAnamnese.FEMININO  },
    { id: 9024, utente_id: 2026224, historico_familiar: 'Avo com enfisema pulmonar.',                   tabagismo: Tabagismo.MENOS_10_CIGARROS_DIA, sexo: SexoAnamnese.MASCULINO },
    { id: 9025, utente_id: 2026225, historico_familiar: 'Mae com asma intermitente na infancia.',        tabagismo: Tabagismo.NAO_FUMADOR,            sexo: SexoAnamnese.FEMININO  },
    { id: 9026, utente_id: 2026226, historico_familiar: 'Pai com rinite cronica e alergia a polens.',   tabagismo: Tabagismo.NAO_FUMADOR,            sexo: SexoAnamnese.MASCULINO },
    { id: 9027, utente_id: 2026227, historico_familiar: 'Mae com eczema atopico e urticaria.',           tabagismo: Tabagismo.NAO_FUMADOR,            sexo: SexoAnamnese.FEMININO  },
    { id: 9028, utente_id: 2026228, historico_familiar: 'Pai fumador com tosse cronica.',               tabagismo: Tabagismo.EXPOSICAO_PASSIVA,     sexo: SexoAnamnese.MASCULINO },
    { id: 9029, utente_id: 2026229, historico_familiar: 'Irmao com asma alergica desde crianca.',       tabagismo: Tabagismo.NAO_FUMADOR,            sexo: SexoAnamnese.FEMININO  },
    { id: 9030, utente_id: 2026230, historico_familiar: 'Avo com asma e rinite persistente.',           tabagismo: Tabagismo.NAO_FUMADOR,            sexo: SexoAnamnese.MASCULINO },
];

// ─── ALERGIAS ─── cobre todas as intensidades (LEVE, MODERADA, GRAVE)
export const testeAlergias = [
    { id: 9501, anamnese_id: 9001, descricao: 'Acaros do po domestico',     frequencia_crise: 'Permanente',          intensidade_crise: IntensidadeCriseAlergia.MODERADA },
    { id: 9502, anamnese_id: 9002, descricao: 'Polen de gramineas',          frequencia_crise: 'Primavera',           intensidade_crise: IntensidadeCriseAlergia.LEVE     },
    { id: 9503, anamnese_id: 9003, descricao: 'Fumo de tabaco',              frequencia_crise: 'Sempre que exposto',  intensidade_crise: IntensidadeCriseAlergia.GRAVE    },
    { id: 9504, anamnese_id: 9004, descricao: 'Pelos de gato',               frequencia_crise: 'Contacto ocasional',  intensidade_crise: IntensidadeCriseAlergia.LEVE     },
    { id: 9505, anamnese_id: 9005, descricao: 'Polen de oliveira',           frequencia_crise: 'Primavera',           intensidade_crise: IntensidadeCriseAlergia.MODERADA },
    { id: 9506, anamnese_id: 9006, descricao: 'Bolores ambientais',          frequencia_crise: 'Dias humidos',        intensidade_crise: IntensidadeCriseAlergia.MODERADA },
    { id: 9507, anamnese_id: 9007, descricao: 'Acaros e tecidos sinteticos', frequencia_crise: 'Noite e manha',       intensidade_crise: IntensidadeCriseAlergia.MODERADA },
    { id: 9508, anamnese_id: 9008, descricao: 'Fumos industriais',           frequencia_crise: 'Ambiente laboral',    intensidade_crise: IntensidadeCriseAlergia.GRAVE    },
    { id: 9509, anamnese_id: 9009, descricao: 'Polen de platano',            frequencia_crise: 'Sazonal',             intensidade_crise: IntensidadeCriseAlergia.LEVE     },
    { id: 9510, anamnese_id: 9010, descricao: 'Fumo de cigarro passivo',     frequencia_crise: 'Diario',              intensidade_crise: IntensidadeCriseAlergia.GRAVE    },
    { id: 9511, anamnese_id: 9011, descricao: 'Pelos de cao',                frequencia_crise: 'Contacto domiciliario',intensidade_crise: IntensidadeCriseAlergia.MODERADA },
    { id: 9512, anamnese_id: 9012, descricao: 'Poeiras domesticas',          frequencia_crise: 'Limpezas',            intensidade_crise: IntensidadeCriseAlergia.LEVE     },
    { id: 9513, anamnese_id: 9013, descricao: 'Latex',                       frequencia_crise: 'Contacto directo',    intensidade_crise: IntensidadeCriseAlergia.GRAVE    },
    { id: 9514, anamnese_id: 9014, descricao: 'Penicilina',                  frequencia_crise: 'Administracao',       intensidade_crise: IntensidadeCriseAlergia.GRAVE    },
    { id: 9515, anamnese_id: 9015, descricao: 'Polen de cipreste',           frequencia_crise: 'Inverno/primavera',   intensidade_crise: IntensidadeCriseAlergia.MODERADA },
    { id: 9516, anamnese_id: 9016, descricao: 'Acaros e polens multiplos',   frequencia_crise: 'Permanente',          intensidade_crise: IntensidadeCriseAlergia.MODERADA },
    { id: 9517, anamnese_id: 9017, descricao: 'Perfumes sinteticos',         frequencia_crise: 'Exposicao esporadica',intensidade_crise: IntensidadeCriseAlergia.LEVE     },
    { id: 9518, anamnese_id: 9018, descricao: 'Fumo e poeiras',              frequencia_crise: 'Diario',              intensidade_crise: IntensidadeCriseAlergia.MODERADA },
    { id: 9519, anamnese_id: 9019, descricao: 'Acaros do po domestico',      frequencia_crise: 'Noite',               intensidade_crise: IntensidadeCriseAlergia.MODERADA },
    { id: 9520, anamnese_id: 9020, descricao: 'Polen de gramineas',          frequencia_crise: 'Primavera/verao',     intensidade_crise: IntensidadeCriseAlergia.LEVE     },
    { id: 9521, anamnese_id: 9021, descricao: 'Polen e pelos de animais',    frequencia_crise: 'Sazonal',             intensidade_crise: IntensidadeCriseAlergia.MODERADA },
    { id: 9522, anamnese_id: 9022, descricao: 'Detergentes industriais',     frequencia_crise: 'Exposicao laboral',   intensidade_crise: IntensidadeCriseAlergia.LEVE     },
    { id: 9523, anamnese_id: 9025, descricao: 'Acaros e bolores',            frequencia_crise: 'Permanente',          intensidade_crise: IntensidadeCriseAlergia.MODERADA },
    { id: 9524, anamnese_id: 9026, descricao: 'Polen de oliveira',           frequencia_crise: 'Primavera',           intensidade_crise: IntensidadeCriseAlergia.LEVE     },
    { id: 9525, anamnese_id: 9027, descricao: 'Acaros e pelos de animais',   frequencia_crise: 'Noite e manha',       intensidade_crise: IntensidadeCriseAlergia.MODERADA },
];

// ─── COMORBIDADES ───
export const testeComorbidades = [
    { id: 9701, anamnese_id: 9001, descricao: 'Rinite alergica persistente'        },
    { id: 9702, anamnese_id: 9002, descricao: 'Dermatite atopica'                  },
    { id: 9703, anamnese_id: 9003, descricao: 'DPOC ligeira'                       },
    { id: 9704, anamnese_id: 9004, descricao: 'Sinusite cronica'                   },
    { id: 9705, anamnese_id: 9005, descricao: 'Conjuntivite alergica'              },
    { id: 9706, anamnese_id: 9006, descricao: 'Refluxo gastroesofagico'            },
    { id: 9707, anamnese_id: 9007, descricao: 'Rinite sazonal'                     },
    { id: 9708, anamnese_id: 9008, descricao: 'DPOC moderada'                      },
    { id: 9709, anamnese_id: 9009, descricao: 'Eczema atopico'                     },
    { id: 9710, anamnese_id: 9010, descricao: 'Apneia obstrutiva do sono'          },
    { id: 9711, anamnese_id: 9011, descricao: 'Rinite alergica e eczema'           },
    { id: 9712, anamnese_id: 9013, descricao: 'Urticaria cronica espontanea'       },
    { id: 9713, anamnese_id: 9014, descricao: 'Alergia medicamentosa'              },
    { id: 9714, anamnese_id: 9015, descricao: 'Rinossinusite cronica'              },
    { id: 9715, anamnese_id: 9016, descricao: 'Asma intermitente'                  },
    { id: 9716, anamnese_id: 9019, descricao: 'Rinite alergica perene'             },
    { id: 9717, anamnese_id: 9020, descricao: 'Polipose nasal'                     },
    { id: 9718, anamnese_id: 9021, descricao: 'Sinusite recorrente'                },
    { id: 9719, anamnese_id: 9023, descricao: 'Conjuntivite e rinite alergica'     },
    { id: 9720, anamnese_id: 9025, descricao: 'Dermatite atopica ligeira'          },
];

// ─── MEDICAÇÕES HABITUAIS ───
export const testeMedicacoesHabituais = [
    { id: 9801, anamnese_id: 9001, nome: 'Budesonida',       dose: '200 mcg', duracao: 'uso continuo', periodicidade: '2x/dia' },
    { id: 9802, anamnese_id: 9003, nome: 'Tiotropio',        dose: '18 mcg',  duracao: 'uso continuo', periodicidade: '1x/dia' },
    { id: 9803, anamnese_id: 9005, nome: 'Salbutamol',       dose: '100 mcg', duracao: 'SOS',          periodicidade: 'em SOS' },
    { id: 9804, anamnese_id: 9007, nome: 'Cetirizina',       dose: '10 mg',   duracao: 'uso continuo', periodicidade: '1x/dia' },
    { id: 9805, anamnese_id: 9008, nome: 'Formoterol',       dose: '12 mcg',  duracao: 'uso continuo', periodicidade: '2x/dia' },
    { id: 9806, anamnese_id: 9010, nome: 'Montelucaste',     dose: '10 mg',   duracao: 'uso continuo', periodicidade: '1x/dia (noite)' },
    { id: 9807, anamnese_id: 9011, nome: 'Fluticasona',      dose: '250 mcg', duracao: 'uso continuo', periodicidade: '2x/dia' },
    { id: 9808, anamnese_id: 9013, nome: 'Loratadina',       dose: '10 mg',   duracao: 'uso continuo', periodicidade: '1x/dia' },
    { id: 9809, anamnese_id: 9015, nome: 'Mometasona nasal', dose: '100 mcg', duracao: 'uso continuo', periodicidade: '1x/dia' },
    { id: 9810, anamnese_id: 9019, nome: 'Budesonida',       dose: '400 mcg', duracao: 'uso continuo', periodicidade: '2x/dia' },
    { id: 9811, anamnese_id: 9021, nome: 'Desloratadina',    dose: '5 mg',    duracao: 'sazonal',      periodicidade: '1x/dia' },
    { id: 9812, anamnese_id: 9025, nome: 'Salbutamol',       dose: '100 mcg', duracao: 'SOS',          periodicidade: 'em SOS' },
];

// ─── ALERTAS ─── cobre todos os tipos, estados e prioridades
export const testeAlertas = [
    { id: 9901, utente_id: 2026201, medico_id: 2026101, tipo: TipoAlerta.SCORE_BAIXO,      estado: EstadoAlerta.NOVO,          prioridade: PrioridadeRegraAlerta.MUITO_ALTA, notas: 'Score CARAT abaixo de 10 pela segunda vez consecutiva.',          data_atualizacao_estado: new Date('2026-05-20T09:00:00') },
    { id: 9902, utente_id: 2026207, medico_id: 2026102, tipo: TipoAlerta.SCORE_BAIXO,      estado: EstadoAlerta.EM_SEGUIMENTO, prioridade: PrioridadeRegraAlerta.ALTA,      notas: 'Score mantido abaixo de 16. A aguardar reavaliacao.',             data_atualizacao_estado: new Date('2026-05-22T10:30:00') },
    { id: 9903, utente_id: 2026213, medico_id: 2026103, tipo: TipoAlerta.SCORE_BAIXO,      estado: EstadoAlerta.VISTO,         prioridade: PrioridadeRegraAlerta.ALTA,      notas: 'Score 13. Doenca mal controlada. Consulta agendada.',             data_atualizacao_estado: new Date('2026-05-18T14:00:00') },
    { id: 9904, utente_id: 2026219, medico_id: 2026104, tipo: TipoAlerta.SCORE_BAIXO,      estado: EstadoAlerta.FECHADO,       prioridade: PrioridadeRegraAlerta.MEDIA,     notas: 'Situacao resolvida apos ajuste terapeutico.',                     data_atualizacao_estado: new Date('2026-05-10T11:00:00') },
    { id: 9905, utente_id: 2026202, medico_id: 2026101, tipo: TipoAlerta.DETERIORACAO,     estado: EstadoAlerta.NOVO,          prioridade: PrioridadeRegraAlerta.ALTA,      notas: 'Queda de 7 pontos no score face a avaliacao anterior.',           data_atualizacao_estado: new Date('2026-05-23T08:45:00') },
    { id: 9906, utente_id: 2026208, medico_id: 2026102, tipo: TipoAlerta.DETERIORACAO,     estado: EstadoAlerta.EM_SEGUIMENTO, prioridade: PrioridadeRegraAlerta.ALTA,      notas: 'Agravamento progressivo dos sintomas respiratorios.',             data_atualizacao_estado: new Date('2026-05-24T09:15:00') },
    { id: 9907, utente_id: 2026214, medico_id: 2026103, tipo: TipoAlerta.DETERIORACAO,     estado: EstadoAlerta.VISTO,         prioridade: PrioridadeRegraAlerta.MEDIA,     notas: 'Pieira noturna mais frequente. Rever medicacao.',                 data_atualizacao_estado: new Date('2026-05-19T16:20:00') },
    { id: 9908, utente_id: 2026220, medico_id: 2026104, tipo: TipoAlerta.DETERIORACAO,     estado: EstadoAlerta.FECHADO,       prioridade: PrioridadeRegraAlerta.BAIXA,     notas: 'Situacao estabilizada apos internamento breve.',                  data_atualizacao_estado: new Date('2026-05-05T10:00:00') },
    { id: 9909, utente_id: 2026225, medico_id: 2026105, tipo: TipoAlerta.DETERIORACAO,     estado: EstadoAlerta.NOVO,          prioridade: PrioridadeRegraAlerta.MUITO_ALTA, notas: 'Crianca com score 9. Exige consulta urgente.',                   data_atualizacao_estado: new Date('2026-05-26T17:00:00') },
    { id: 9910, utente_id: 2026203, medico_id: 2026101, tipo: TipoAlerta.EXAME_NECESSARIO, estado: EstadoAlerta.NOVO,          prioridade: PrioridadeRegraAlerta.MEDIA,     notas: 'Espirometria de controlo necessaria antes da proxima consulta.',  data_atualizacao_estado: new Date('2026-05-25T09:55:00') },
    { id: 9911, utente_id: 2026209, medico_id: 2026102, tipo: TipoAlerta.EXAME_NECESSARIO, estado: EstadoAlerta.EM_SEGUIMENTO, prioridade: PrioridadeRegraAlerta.MEDIA,     notas: 'IgE especifica pedida. Aguarda resultado laboratorial.',          data_atualizacao_estado: new Date('2026-05-21T13:00:00') },
    { id: 9912, utente_id: 2026215, medico_id: 2026103, tipo: TipoAlerta.EXAME_NECESSARIO, estado: EstadoAlerta.VISTO,         prioridade: PrioridadeRegraAlerta.BAIXA,     notas: 'Oximetria nocturna agendada para semana seguinte.',               data_atualizacao_estado: new Date('2026-05-17T11:30:00') },
    { id: 9913, utente_id: 2026221, medico_id: 2026104, tipo: TipoAlerta.EXAME_NECESSARIO, estado: EstadoAlerta.FECHADO,       prioridade: PrioridadeRegraAlerta.BAIXA,     notas: 'TAC toracica realizada e analisada. Sem alteracoes relevantes.',  data_atualizacao_estado: new Date('2026-05-08T15:45:00') },
    { id: 9914, utente_id: 2026226, medico_id: 2026105, tipo: TipoAlerta.EXAME_NECESSARIO, estado: EstadoAlerta.NOVO,          prioridade: PrioridadeRegraAlerta.MEDIA,     notas: 'Teste de funcao respiratoria pediatrica em falta.',               data_atualizacao_estado: new Date('2026-05-27T10:10:00') },
];

// ─── PLANOS DE ACOMPANHAMENTO ─── cobre todos os estados
export const testePlanosAcompanhamento = [
    { id: 10101, medico_id: 2026101, utente_id: 2026201, frequencia_avaliacao: 'Mensal',    data_inicio: new Date('2026-04-01'), data_fim: new Date('2026-10-01'), estado: EstadoPlanoAcompanhamento.ATIVO,    recomendacao_medica: 'Monitorizar sintomas e score CARAT mensalmente. Reforcar adesao a medicacao.' },
    { id: 10102, medico_id: 2026101, utente_id: 2026202, frequencia_avaliacao: 'Quinzenal', data_inicio: new Date('2026-04-15'), data_fim: new Date('2026-08-15'), estado: EstadoPlanoAcompanhamento.ATIVO,    recomendacao_medica: 'Rever controlo da pieira. Avaliar necessidade de terapeutica de resgate.' },
    { id: 10103, medico_id: 2026102, utente_id: 2026207, frequencia_avaliacao: 'Mensal',    data_inicio: new Date('2026-03-01'), data_fim: new Date('2026-09-01'), estado: EstadoPlanoAcompanhamento.ATIVO,    recomendacao_medica: 'Controlo de alergenios domesticos. Imunoterapia em avaliacao.' },
    { id: 10104, medico_id: 2026102, utente_id: 2026208, frequencia_avaliacao: 'Semanal',   data_inicio: new Date('2026-05-01'), data_fim: new Date('2026-07-01'), estado: EstadoPlanoAcompanhamento.ATIVO,    recomendacao_medica: 'Acompanhamento intensivo devido a agravamento recente dos sintomas.' },
    { id: 10105, medico_id: 2026103, utente_id: 2026213, frequencia_avaliacao: 'Mensal',    data_inicio: new Date('2026-04-10'), data_fim: new Date('2026-12-10'), estado: EstadoPlanoAcompanhamento.ATIVO,    recomendacao_medica: 'Evitar exposicao a latex. Manter adrenalina auto-injectavel disponivel.' },
    { id: 10106, medico_id: 2026103, utente_id: 2026215, frequencia_avaliacao: 'Quinzenal', data_inicio: new Date('2026-02-01'), data_fim: new Date('2026-06-01'), estado: EstadoPlanoAcompanhamento.CONCLUIDO, recomendacao_medica: 'Plano concluido. Controlo adequado apos imunoterapia.' },
    { id: 10107, medico_id: 2026104, utente_id: 2026219, frequencia_avaliacao: 'Mensal',    data_inicio: new Date('2026-04-20'), data_fim: new Date('2026-10-20'), estado: EstadoPlanoAcompanhamento.SUSPENSO,  recomendacao_medica: 'Suspenso temporariamente por hospitalizacao. Retomar em junho.' },
    { id: 10108, medico_id: 2026104, utente_id: 2026220, frequencia_avaliacao: 'Mensal',    data_inicio: new Date('2026-01-15'), data_fim: new Date('2026-05-15'), estado: EstadoPlanoAcompanhamento.CONCLUIDO, recomendacao_medica: 'Concluido apos estabilizacao clinica. Alta programada.' },
    { id: 10109, medico_id: 2026105, utente_id: 2026225, frequencia_avaliacao: 'Quinzenal', data_inicio: new Date('2026-05-10'), data_fim: new Date('2026-09-10'), estado: EstadoPlanoAcompanhamento.ATIVO,    recomendacao_medica: 'Acompanhamento pediatrico. Registar episodios noturnos e resposta ao broncodilatador.' },
    { id: 10110, medico_id: 2026105, utente_id: 2026226, frequencia_avaliacao: 'Mensal',    data_inicio: new Date('2026-03-01'), data_fim: new Date('2026-07-01'), estado: EstadoPlanoAcompanhamento.CANCELADO, recomendacao_medica: 'Cancelado por transferencia para outro medico.' },
];

// ─── RESPOSTAS CARAT ─── score = 30 − soma(r1..r10)  ≥21 BEM | 16-20 PARCIAL | <16 MAL
const BEM     = 'Doenca bem controlada';
const PARCIAL = 'Doenca parcialmente controlada';
const MAL     = 'Doenca mal controlada';
const REC_BEM     = 'A doenca esta bem controlada. Continue o tratamento atual e mantenha a adesao a medicacao.';
const REC_PARCIAL = 'A doenca esta parcialmente controlada. Reveja a adesao a medicacao e consulte o medico.';
const REC_MAL     = 'A doenca esta mal controlada. Consulte o medico com urgencia para rever o tratamento.';

export const testeRespostasCarat = [
    // Utente 2026201 — deterioracao: 24 → 17 → 9
    { id: 11001, avaliacao_id: 1, utente_id: 2026201, data_avaliacao: new Date('2026-03-10'),
      r1: R.Nunca, r2: R.Nunca, r3: R.Nunca, r4: R.Nunca, r5: R.AteUmOuDoisDias, r6: R.AteUmOuDoisDias, r7: R.AteUmOuDoisDias, r8: R.Nunca, r9: R.Nunca, r10: R10.Nunca,
      score_total: 24, interpretacao: BEM, recomendacao_automatica: REC_BEM },
    { id: 11002, avaliacao_id: 1, utente_id: 2026201, data_avaliacao: new Date('2026-04-15'),
      r1: R.AteUmOuDoisDias, r2: R.AteUmOuDoisDias, r3: R.AteUmOuDoisDias, r4: R.MaisDeDoisDiasPorSemana, r5: R.MaisDeDoisDiasPorSemana, r6: R.AteUmOuDoisDias, r7: R.AteUmOuDoisDias, r8: R.AteUmOuDoisDias, r9: R.MaisDeDoisDiasPorSemana, r10: R10.Menos_De_7_Dias,
      score_total: 17, interpretacao: PARCIAL, recomendacao_automatica: REC_PARCIAL },
    { id: 11003, avaliacao_id: 1, utente_id: 2026201, data_avaliacao: new Date('2026-05-20'),
      r1: R.MaisDeDoisDiasPorSemana, r2: R.MaisDeDoisDiasPorSemana, r3: R.MaisDeDoisDiasPorSemana, r4: R.QuaseTodosOsDias, r5: R.QuaseTodosOsDias, r6: R.MaisDeDoisDiasPorSemana, r7: R.MaisDeDoisDiasPorSemana, r8: R.MaisDeDoisDiasPorSemana, r9: R.QuaseTodosOsDias, r10: R10._7_Ou_Mais_Dias,
      score_total: 9, interpretacao: MAL, recomendacao_automatica: REC_MAL },
    // Utente 2026202 — melhoria: 10 → 18 → 23
    { id: 11004, avaliacao_id: 1, utente_id: 2026202, data_avaliacao: new Date('2026-03-01'),
      r1: R.MaisDeDoisDiasPorSemana, r2: R.QuaseTodosOsDias, r3: R.MaisDeDoisDiasPorSemana, r4: R.MaisDeDoisDiasPorSemana, r5: R.QuaseTodosOsDias, r6: R.MaisDeDoisDiasPorSemana, r7: R.MaisDeDoisDiasPorSemana, r8: R.AteUmOuDoisDias, r9: R.MaisDeDoisDiasPorSemana, r10: R10.Menos_De_7_Dias,
      score_total: 10, interpretacao: MAL, recomendacao_automatica: REC_MAL },
    { id: 11005, avaliacao_id: 1, utente_id: 2026202, data_avaliacao: new Date('2026-04-10'),
      r1: R.AteUmOuDoisDias, r2: R.MaisDeDoisDiasPorSemana, r3: R.AteUmOuDoisDias, r4: R.AteUmOuDoisDias, r5: R.MaisDeDoisDiasPorSemana, r6: R.AteUmOuDoisDias, r7: R.AteUmOuDoisDias, r8: R.AteUmOuDoisDias, r9: R.AteUmOuDoisDias, r10: R10.Nunca,
      score_total: 18, interpretacao: PARCIAL, recomendacao_automatica: REC_PARCIAL },
    { id: 11006, avaliacao_id: 1, utente_id: 2026202, data_avaliacao: new Date('2026-05-22'),
      r1: R.AteUmOuDoisDias, r2: R.Nunca, r3: R.AteUmOuDoisDias, r4: R.Nunca, r5: R.AteUmOuDoisDias, r6: R.Nunca, r7: R.AteUmOuDoisDias, r8: R.Nunca, r9: R.Nunca, r10: R10.Nao_Toma_Medicamentos,
      score_total: 23, interpretacao: BEM, recomendacao_automatica: REC_BEM },
    // Utente 2026207 — estavel bem controlado: 22 → 24
    { id: 11007, avaliacao_id: 1, utente_id: 2026207, data_avaliacao: new Date('2026-04-01'),
      r1: R.AteUmOuDoisDias, r2: R.AteUmOuDoisDias, r3: R.AteUmOuDoisDias, r4: R.AteUmOuDoisDias, r5: R.AteUmOuDoisDias, r6: R.AteUmOuDoisDias, r7: R.AteUmOuDoisDias, r8: R.Nunca, r9: R.Nunca, r10: R10.Nunca,
      score_total: 22, interpretacao: BEM, recomendacao_automatica: REC_BEM },
    { id: 11008, avaliacao_id: 1, utente_id: 2026207, data_avaliacao: new Date('2026-05-15'),
      r1: R.AteUmOuDoisDias, r2: R.Nunca, r3: R.AteUmOuDoisDias, r4: R.Nunca, r5: R.AteUmOuDoisDias, r6: R.AteUmOuDoisDias, r7: R.Nunca, r8: R.Nunca, r9: R.Nunca, r10: R10.Nunca,
      score_total: 24, interpretacao: BEM, recomendacao_automatica: REC_BEM },
    // Utente 2026208 — estavel mal controlado: 12 → 11
    { id: 11009, avaliacao_id: 1, utente_id: 2026208, data_avaliacao: new Date('2026-04-20'),
      r1: R.MaisDeDoisDiasPorSemana, r2: R.AteUmOuDoisDias, r3: R.MaisDeDoisDiasPorSemana, r4: R.MaisDeDoisDiasPorSemana, r5: R.AteUmOuDoisDias, r6: R.MaisDeDoisDiasPorSemana, r7: R.MaisDeDoisDiasPorSemana, r8: R.MaisDeDoisDiasPorSemana, r9: R.AteUmOuDoisDias, r10: R10.Menos_De_7_Dias,
      score_total: 12, interpretacao: MAL, recomendacao_automatica: REC_MAL },
    { id: 11010, avaliacao_id: 1, utente_id: 2026208, data_avaliacao: new Date('2026-05-25'),
      r1: R.MaisDeDoisDiasPorSemana, r2: R.MaisDeDoisDiasPorSemana, r3: R.AteUmOuDoisDias, r4: R.MaisDeDoisDiasPorSemana, r5: R.MaisDeDoisDiasPorSemana, r6: R.MaisDeDoisDiasPorSemana, r7: R.MaisDeDoisDiasPorSemana, r8: R.MaisDeDoisDiasPorSemana, r9: R.MaisDeDoisDiasPorSemana, r10: R10.Menos_De_7_Dias,
      score_total: 11, interpretacao: MAL, recomendacao_automatica: REC_MAL },
    // Utente 2026213 — variavel: 19 → 14 → 21
    { id: 11011, avaliacao_id: 1, utente_id: 2026213, data_avaliacao: new Date('2026-03-15'),
      r1: R.AteUmOuDoisDias, r2: R.AteUmOuDoisDias, r3: R.MaisDeDoisDiasPorSemana, r4: R.AteUmOuDoisDias, r5: R.AteUmOuDoisDias, r6: R.MaisDeDoisDiasPorSemana, r7: R.AteUmOuDoisDias, r8: R.AteUmOuDoisDias, r9: R.MaisDeDoisDiasPorSemana, r10: R10.Nunca,
      score_total: 19, interpretacao: PARCIAL, recomendacao_automatica: REC_PARCIAL },
    { id: 11012, avaliacao_id: 1, utente_id: 2026213, data_avaliacao: new Date('2026-04-25'),
      r1: R.MaisDeDoisDiasPorSemana, r2: R.MaisDeDoisDiasPorSemana, r3: R.MaisDeDoisDiasPorSemana, r4: R.AteUmOuDoisDias, r5: R.MaisDeDoisDiasPorSemana, r6: R.MaisDeDoisDiasPorSemana, r7: R.AteUmOuDoisDias, r8: R.AteUmOuDoisDias, r9: R.MaisDeDoisDiasPorSemana, r10: R10.Menos_De_7_Dias,
      score_total: 14, interpretacao: MAL, recomendacao_automatica: REC_MAL },
    { id: 11013, avaliacao_id: 1, utente_id: 2026213, data_avaliacao: new Date('2026-05-28'),
      r1: R.AteUmOuDoisDias, r2: R.Nunca, r3: R.AteUmOuDoisDias, r4: R.AteUmOuDoisDias, r5: R.AteUmOuDoisDias, r6: R.Nunca, r7: R.Nunca, r8: R.AteUmOuDoisDias, r9: R.Nunca, r10: R10.Nunca,
      score_total: 21, interpretacao: BEM, recomendacao_automatica: REC_BEM },
    // Utente 2026219 — avaliacao unica no limiar: 16
    { id: 11014, avaliacao_id: 1, utente_id: 2026219, data_avaliacao: new Date('2026-05-05'),
      r1: R.AteUmOuDoisDias, r2: R.AteUmOuDoisDias, r3: R.MaisDeDoisDiasPorSemana, r4: R.AteUmOuDoisDias, r5: R.MaisDeDoisDiasPorSemana, r6: R.AteUmOuDoisDias, r7: R.MaisDeDoisDiasPorSemana, r8: R.AteUmOuDoisDias, r9: R.AteUmOuDoisDias, r10: R10.Menos_De_7_Dias,
      score_total: 16, interpretacao: PARCIAL, recomendacao_automatica: REC_PARCIAL },
    // Utente 2026225 — crianca, score critico: 9
    { id: 11015, avaliacao_id: 1, utente_id: 2026225, data_avaliacao: new Date('2026-05-18'),
      r1: R.MaisDeDoisDiasPorSemana, r2: R.QuaseTodosOsDias, r3: R.MaisDeDoisDiasPorSemana, r4: R.MaisDeDoisDiasPorSemana, r5: R.QuaseTodosOsDias, r6: R.MaisDeDoisDiasPorSemana, r7: R.QuaseTodosOsDias, r8: R.MaisDeDoisDiasPorSemana, r9: R.MaisDeDoisDiasPorSemana, r10: R10._7_Ou_Mais_Dias,
      score_total: 9, interpretacao: MAL, recomendacao_automatica: REC_MAL },
];

// ─── AUDITORIAS ─── cobre CRIACAO, ALTERACAO, ELIMINACAO
export const testeAuditorias = [
    { log_id: 9001, utilizador_id: 2026001, tabela: 'utilizador',           tabela_id: 2026201, operacao: OperacaoAuditoria.CRIACAO,    valor_anterior: null,                            valor_novo: '{"id":2026201,"nome":"Ana Ferreira","perfil":"UTENTE"}' },
    { log_id: 9002, utilizador_id: 2026001, tabela: 'utilizador',           tabela_id: 2026202, operacao: OperacaoAuditoria.CRIACAO,    valor_anterior: null,                            valor_novo: '{"id":2026202,"nome":"Bruno Costa","perfil":"UTENTE"}' },
    { log_id: 9003, utilizador_id: 2026101, tabela: 'utente',               tabela_id: 2026201, operacao: OperacaoAuditoria.ALTERACAO,  valor_anterior: '{"medico_id":2026102}',         valor_novo: '{"medico_id":2026101}' },
    { log_id: 9004, utilizador_id: 2026101, tabela: 'prescricao',           tabela_id: 5001,    operacao: OperacaoAuditoria.CRIACAO,    valor_anterior: null,                            valor_novo: '{"tipo":"MEDICACAO","estado":"ATIVA"}' },
    { log_id: 9005, utilizador_id: 2026101, tabela: 'prescricao',           tabela_id: 5013,    operacao: OperacaoAuditoria.ALTERACAO,  valor_anterior: '{"estado":"ATIVA"}',            valor_novo: '{"estado":"DISPENSADA"}' },
    { log_id: 9006, utilizador_id: 2026102, tabela: 'alerta',               tabela_id: 9905,    operacao: OperacaoAuditoria.CRIACAO,    valor_anterior: null,                            valor_novo: '{"tipo":"DETERIORACAO","prioridade":"ALTA"}' },
    { log_id: 9007, utilizador_id: 2026102, tabela: 'alerta',               tabela_id: 9904,    operacao: OperacaoAuditoria.ALTERACAO,  valor_anterior: '{"estado":"NOVO"}',             valor_novo: '{"estado":"FECHADO"}' },
    { log_id: 9008, utilizador_id: 2026103, tabela: 'sintoma',              tabela_id: 8010,    operacao: OperacaoAuditoria.CRIACAO,    valor_anterior: null,                            valor_novo: '{"descricao":"Urticaria apos contacto com latex","intensidade":"GRAVE"}' },
    { log_id: 9009, utilizador_id: 2026201, tabela: 'sintoma',              tabela_id: 8001,    operacao: OperacaoAuditoria.ALTERACAO,  valor_anterior: '{"intensidade":"LIGEIRA"}',     valor_novo: '{"intensidade":"MODERADA"}' },
    { log_id: 9010, utilizador_id: 2026104, tabela: 'plano_acompanhamento', tabela_id: 10107,   operacao: OperacaoAuditoria.ALTERACAO,  valor_anterior: '{"estado":"ATIVO"}',            valor_novo: '{"estado":"SUSPENSO"}' },
    { log_id: 9011, utilizador_id: 2026001, tabela: 'administrador',        tabela_id: 2026005, operacao: OperacaoAuditoria.ELIMINACAO, valor_anterior: '{"id":2026005,"nome":"Eva Rodrigues"}', valor_novo: null },
    { log_id: 9012, utilizador_id: 2026001, tabela: 'utilizador',           tabela_id: 2026005, operacao: OperacaoAuditoria.ELIMINACAO, valor_anterior: '{"id":2026005,"nome":"Eva Rodrigues","perfil":"ADMINISTRADOR"}', valor_novo: null },
    { log_id: 9013, utilizador_id: 2026105, tabela: 'prescricao',           tabela_id: 5017,    operacao: OperacaoAuditoria.ALTERACAO,  valor_anterior: '{"estado":"ATIVA"}',            valor_novo: '{"estado":"CANCELADA"}' },
    { log_id: 9014, utilizador_id: 2026102, tabela: 'alerta',               tabela_id: 9911,    operacao: OperacaoAuditoria.ALTERACAO,  valor_anterior: '{"estado":"NOVO"}',             valor_novo: '{"estado":"EM SEGUIMENTO"}' },
    { log_id: 9015, utilizador_id: 2026103, tabela: 'plano_acompanhamento', tabela_id: 10106,   operacao: OperacaoAuditoria.ALTERACAO,  valor_anterior: '{"estado":"ATIVO"}',            valor_novo: '{"estado":"CONCLUIDO"}' },
];
