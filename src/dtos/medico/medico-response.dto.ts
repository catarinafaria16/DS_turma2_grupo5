export interface MedicoResponseDto {
    id: number;
    utilizador_id: number;
    numero_cedula_medica: number;
    especialidade: string;
    contacto: string;
    deleted_at?: Date;
}
