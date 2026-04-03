import { Component, Input, OnChanges, OnInit, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Player } from '../../models/players';
import { ItemsService } from '../../services/items.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './detail.html',
  styleUrls: ['./detail.css']
})
export class DetailComponent implements OnInit, OnChanges {
  @Input() jugador?: Player;
  @Output() saved = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  playerForm: FormGroup;
  editMode = false;
  isSaving = false;

  posiciones = ['Base', 'Escolta', 'Alero', 'Ala-pívot', 'Pívot'];

  constructor(
    private fb: FormBuilder,
    private itemsService: ItemsService,
    private sanitizer: DomSanitizer
  ) {
    this.playerForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(30)]],
      apellidos: ['', [Validators.required, Validators.maxLength(50)]],
      posicion: ['', Validators.required],
      pais: ['', [Validators.required, Validators.maxLength(30)]],
      edad: [18, [Validators.required, Validators.min(16), Validators.max(50)]],
      altura: [180, [Validators.required, Validators.min(150), Validators.max(250)]],
      peso: [75, [Validators.required, Validators.min(50), Validators.max(200)]],
      PPP: [0, [Validators.required, Validators.min(0)]],
      APP: [0, [Validators.required, Validators.min(0)]],
      RPP: [0, [Validators.required, Validators.min(0)]],
      TirosCampo: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      videoURL: [''],
      biografia: ['', [Validators.required, Validators.minLength(10)]],
      numejersey: [0, [Validators.required, Validators.min(0), Validators.max(99)]],
      imagen: [''],
    });
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['jugador']) {
      this.initializeForm();
    }
  }

  getSafeVideoUrl(): SafeResourceUrl | null {
  const url = this.playerForm.get('videoURL')?.value;
  if (!url) return null;
  return this.sanitizer.bypassSecurityTrustResourceUrl(url);
}

  get isNewPlayer(): boolean {
    return !this.jugador;
  }

  private initializeForm(): void {
    if (this.jugador) {
      this.loadPlayerData();
      this.playerForm.disable();
      this.editMode = false;
    } else {
      this.resetFormForNewPlayer();
      this.playerForm.enable();
      this.editMode = true;
    }
  }

  private loadPlayerData(): void {
    this.playerForm.patchValue({
      nombre: this.jugador?.nombre ?? '',
      apellidos: this.jugador?.apellidos ?? '',
      posicion: this.jugador?.posicion ?? '',
      pais: this.jugador?.pais ?? '',
      edad: this.jugador?.edad ?? 18,
      altura: this.jugador?.altura ?? 180,
      peso: this.jugador?.peso ?? 75,
      PPP: this.jugador?.PPP ?? 0,
      APP: this.jugador?.APP ?? 0,
      RPP: this.jugador?.RPP ?? 0,
      TirosCampo: this.jugador?.TirosCampo ?? 0,
      videoURL: this.jugador?.videoURL ?? '',
      biografia: this.jugador?.biografia ?? '',
      numejersey: this.jugador?.numejersey ?? 0,
      imagen: this.jugador?.imagen ?? ''
    });
  }

  private resetFormForNewPlayer(): void {
  this.playerForm.reset({
    nombre: '',
    apellidos: '',
    posicion: '',
    pais: '',
    edad: 18,
    altura: 180,
    peso: 75,
    PPP: 0,
    APP: 0,
    RPP: 0,
    TirosCampo: 0,
    videoURL: '',
    biografia: '',
    numejersey: 0,
    imagen: ''
  });
}

  enableEdit(): void {
    this.editMode = true;
    this.playerForm.enable();
  }

  cancelEdit(): void {
  if (this.jugador) {
    this.loadPlayerData();
    this.playerForm.disable();
    this.editMode = false;
  } else {
    this.resetFormForNewPlayer();
    this.cancelled.emit();
  }
}

  async savePlayer(): Promise<void> {
  if (this.playerForm.invalid) {
    this.playerForm.markAllAsTouched();

    console.log('Formulario inválido');
    console.log('Valores actuales:', this.playerForm.getRawValue());

    Object.keys(this.playerForm.controls).forEach(key => {
      const control = this.playerForm.get(key);
      if (control?.invalid) {
        console.log(`Campo inválido: ${key}`, control.errors);
      }
    });

    alert('No se puede guardar porque hay campos inválidos. Mira la consola.');
    return;
  }

  this.isSaving = true;

  const formValue = this.playerForm.getRawValue();

  try {
    console.log('ID jugador:', this.jugador?.id);
    console.log('Datos a guardar:', formValue);

    if (this.isNewPlayer) {
      await this.itemsService.addItem(formValue);
      console.log('Jugador creado correctamente');
    } else if (this.jugador?.id) {
      await this.itemsService.updateItem(this.jugador.id, formValue);
      console.log('Jugador actualizado correctamente');
    } else {
      console.warn('No hay id para actualizar');
    }

    this.saved.emit();

  } catch (error: any) {
    console.error('Error guardando jugador', error);
    alert('Error al guardar el jugador: ' + (error?.message || error));
  } finally {
    this.isSaving = false;
  }
}

  hasError(controlName: string, errorName: string): boolean {
    const control = this.playerForm.get(controlName);
    return !!control && control.hasError(errorName) && (control.touched || control.dirty);
  }

  isInvalid(controlName: string): boolean {
    const control = this.playerForm.get(controlName);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  getControlError(controlName: string, errorName: string): any {
    return this.playerForm.get(controlName)?.errors?.[errorName];
  }
}