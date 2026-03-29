export interface Player {
    id?: string;
    nombre: string;
    apellidos: string;
    posicion: 'Base' | 'Escolta' | 'Alero' | 'Ala-pívot' | 'Pívot';
    pais: string;
    edad: number; // Valor por defecto para evitar errores en el filtro de edad
    altura: number;
    peso: number;
    PPP: number; // Puntos Por Partido
    APP: number; // Asistencias Por Partido
    RPP: number; // Rebotes Por Partido
    TirosCampo: number; // Porcentaje
    videoURL: string; //Xavi debe proporcionar un enlace a un video destacado del jugador
    biografia: string;
    numejersey: number;
    imagen: string; // URL de la imagen del jugador
}