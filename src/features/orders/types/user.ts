export interface Direccion {
   id: number,
   usuario_id: number,
   alias: string,
   linea1: string,
   linea2: string,
   ciudad: string,
   provincia: string,
   codigo_postal: string,
   latitud: string,
   longitud: string,
   es_principal: boolean
}

export interface Usuario {
   id: number;
   nombre: string;
   apellido: string;
   email: string;
   celular: string;
   roles: string[];
   direcciones: Direccion[];
}