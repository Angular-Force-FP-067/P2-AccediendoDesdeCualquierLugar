# ItemsService (resumen y ejemplos)

Ubicación: `src/app/services/items.service.ts`

Colección usada: `players` (Firestore)

Descripción
----------
`ItemsService` es la capa de acceso a datos de la app. Encapsula las operaciones CRUD sobre la colección `players` en Firestore y expone métodos simples que usan los componentes:

- `getItems(): Observable<Player[]>` — devuelve un Observable que emite la lista de jugadores (reactivo, collectionData).
- `getItemById(id: string): Observable<Player | undefined>` — devuelve un Observable con el documento indicado.
- `addItem(item: Omit<Player, 'id'>): Promise<any>` — añade un nuevo documento a la colección.
- `updateItem(id: string, item: Partial<Player>): Promise<void>` — actualiza un documento existente.
- `deleteItem(id: string): Promise<void>` — borra un documento.

Notas técnicas
-------------
- El servicio usa `runInInjectionContext` para ejecutar las llamadas a AngularFire dentro del contexto de inyección y evitar warnings de AngularFire ("Calling Firebase APIs outside of an Injection context").
- `collectionData` devuelve objetos con un campo `id` (string) gracias a `{ idField: 'id' }`; si el modelo `Player` tiene `id` definido como `number` ajustar en el código la conversión a `string` cuando corresponda.
- Las reglas de seguridad de Firestore deben permitir lecturas/escrituras durante el desarrollo; revisad con Cèlia si hay problemas de permisos.

Ejemplos de uso
--------------

1) Mostrar lista de jugadores (ejemplo en `PlayersComponent`):

```ts
players$ = this.itemsService.getItems();

// en la plantilla:
// *ngFor="let p of (players$ | async)"
```

2) Borrar desde el listado (ejemplo ya implementado):

```html
<button (click)="deletePlayer(player, $event)">Borrar</button>
```

```ts
deletePlayer(player: Player, event?: Event) {
  event?.stopPropagation();
  const id = String((player as any).id);
  if (!confirm('¿Eliminar?')) return;
  this.itemsService.deleteItem(id)
    .then(() => console.log('borrado'))
    .catch(err => console.error(err));
}
```

3) Leer un jugador en `DetailComponent`:

```ts
this.itemsService.getItemById(id).subscribe(player => {
  this.jugador = player;
});
```

4) Crear o actualizar (ejemplo):

```ts
// crear
this.itemsService.addItem(newPlayer).then(() => {/* navegar al listado */});

// actualizar
this.itemsService.updateItem(id, patch).then(() => {/* navegar al detalle */});
```

Comprobación rápida
-------------------
- Inicia la app: `npm start`.
- Abre `http://localhost:4200` y en la página de plantilla verás el contador de jugadores.
- Abre la consola del navegador para ver logs y posibles errores (F12).
