# Firebase Configuration - Proyecto "Equipo Basket"

Este documento describe la configuración de Firebase utilizada en el proyecto de estudio **Equipo Basket**.

---

## 1️⃣ Nombre del proyecto
**equipo-basket-e20b9**

---

## 2️⃣ Colección principal
**players**

---

## 3️⃣ Estructura de los documentos (Player)

| Campo        | Tipo     | Ejemplo                                   |
|-------------|---------|-------------------------------------------|
| id          | string   | "1"                                       |
| nombre      | string   | "Precious"                                |
| apellidos   | string   | "Achiuwa"                                 |
| posicion    | string   | "Alero"                                   |
| pais        | string   | "Nigeria"                                 |
| edad        | number   | 26                                        |
| altura      | number   | 203                                       |
| peso        | number   | 110                                       |
| PPP         | number   | 15.4                                      |
| APP         | number   | 8.2                                       |
| RPP         | number   | 3.5                                       |
| TirosCampo  | number   | 45.3                                      |
| videoURL    | string   | "media/players/001/highlight.mp4"        |
| biografia   | string   | Texto biográfico                           |
| numejersey  | number   | 9                                         |
| imagen      | string   | "media/players/001/profile.png"           |

> ⚠️ Todos los campos son obligatorios según la estructura de la aplicación.

---

## 4️⃣ Reglas de Firestore

Para fines de estudio, las reglas se han configurado para que **no caduquen y permitan lectura y escritura completa**:

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}