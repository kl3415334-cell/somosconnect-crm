/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Types and interfaces for SomosConnect CRM - Corporación Social Somos Uno
 */

export type RoleType = 
  | 'Administrador'
  | 'Administrador de la plataforma'
  | 'Gerente'
  | 'Coordinador de Servicio al Cliente'
  | 'Asesor de Servicio al Cliente'
  | 'Gestor de PQRS';

export interface SystemUser {
  id: string;
  nombre: string;
  email: string;
  cargo: RoleType;
  avatar?: string;
  permisos: {
    canDelete: boolean;
    canAssign: boolean;
    canRespond: boolean;
    canClose: boolean;
    canConfigureLegal: boolean;
    canEditFunctions: boolean;
    canExportReports: boolean;
    canManageUsers: boolean;
  };
}

export type TipoDocumento = 'CC' | 'CE' | 'TI' | 'Pasaporte' | 'NIT' | 'PEP';
export type TipoUsuario = 'Beneficiario' | 'Afiliado' | 'Aliado' | 'Proveedor' | 'Comunidad General';
export type EstadoAtencionUsuario = 'Activo' | 'En atención' | 'Al día' | 'Con solicitud pendiente';

export interface CRMUser {
  id: string;
  nombre: string;
  tipoDocumento: TipoDocumento;
  documento: string;
  email: string;
  telefono: string;
  tipoUsuario: TipoUsuario;
  direccion: string;
  ciudad: string;
  fechaRegistro: string;
  estadoAtencion: EstadoAtencionUsuario;
  observaciones: string;
  autorizacionDatos: boolean; // Ley 1581 de 2012
}

export type TipoPQRS = 
  | 'Petición'
  | 'Queja'
  | 'Reclamo'
  | 'Sugerencia'
  | 'Felicitación'
  | 'Solicitud de información';

export type CanalRecepcion = 
  | 'WhatsApp'
  | 'Correo electrónico'
  | 'Llamada telefónica'
  | 'Página web'
  | 'Atención presencial';

export type AreaResponsable = 
  | 'Servicio al Cliente'
  | 'Jurídica'
  | 'Trabajo Social'
  | 'Proyectos Comunitarios'
  | 'Dirección General'
  | 'Talento Humano';

export type Prioridad = 'Baja' | 'Media' | 'Alta' | 'Crítica';

export type EstadoPQRS = 
  | 'Recibida'
  | 'Pendiente de asignación'
  | 'Asignada'
  | 'En proceso'
  | 'En espera de información'
  | 'Respondida'
  | 'Solucionada y cerrada';

export interface ArchivoAdjunto {
  id: string;
  nombre: string;
  tamano: string;
  tipo: string;
  fecha: string;
}

export interface ActividadSeguimiento {
  id: string;
  fecha: string;
  autor: string;
  rol: string;
  accion: string;
  detalle?: string;
}

export interface SolicitudPQRS {
  id: string;
  consecutivo: string; // e.g., PQRS-2026-001
  userId: string;
  userName: string;
  userDoc: string;
  userEmail: string;
  userPhone: string;
  fechaRecepcion: string; // YYYY-MM-DD
  horaRecepcion: string; // HH:mm
  tipo: TipoPQRS;
  descripcion: string;
  canalRecepcion: CanalRecepcion;
  areaResponsable: AreaResponsable;
  colaboradorAsignado: string;
  prioridad: Prioridad;
  fechaLimite: string; // YYYY-MM-DD
  diasTermino: number;
  normaAplicable: string;
  estado: EstadoPQRS;
  documentosAdjuntos: ArchivoAdjunto[];
  observaciones: string;
  respuestaEnviada: string;
  fechaCierre?: string;
  solucionDetalle?: string;
  actividades: ActividadSeguimiento[];
  encuestaId?: string;
}

export interface EncuestaSatisfaccion {
  id: string;
  pqrsId: string;
  consecutivoPQRS: string;
  userId: string;
  userName: string;
  calificacion: number; // 1 to 5
  respuestaClara: 'Sí' | 'Parcialmente' | 'No';
  solicitudSolucionada: 'Sí' | 'En trámite' | 'No';
  aspectoMejorar: string;
  comentario: string;
  fecha: string;
}

export interface NormaLegal {
  id: string;
  nombre: string;
  numeroAno: string;
  descripcion: string;
  aplicacion: string;
  recomendaciones: string;
  diasHabilesPorDefecto: number;
  fuenteUrl?: string;
}

export interface TerminoConfig {
  tipoPQRS: TipoPQRS;
  diasHabiles: number;
  normaReferencia: string;
  aplicaEntidadPrivada: boolean;
  descripcion: string;
}

export interface ManualCargo {
  id: string;
  cargo: RoleType;
  area: string;
  jefeInmediato: string;
  objetivo: string;
  funciones: string[];
  responsabilidades: string[];
  autoridad: string[];
  perfil: {
    educacion: string;
    experiencia: string;
    conocimientos: string[];
  };
  competencias: string[];
  indicadores: string[];
}

export interface LogActividad {
  id: string;
  timestamp: string;
  usuario: string;
  rol: string;
  modulo: string;
  accion: string;
  detalle: string;
}
