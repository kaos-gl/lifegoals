import { Component, OnInit } from '@angular/core';
import { MetaServiceService } from '../services/meta-service.service';
import { Meta } from '../models/meta.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  // Aquí guardaremos la lista de metas que nos llegue de la base de datos
  metasLista: Meta[] = [];
  
  // Esta variable se conectará directamente a la caja de texto donde escribes tu nueva meta
  nuevaMetaTexto: string = '';

  // Inyectamos nuestro servicio
  constructor(private metaService: MetaServiceService) { }

  // Este método se ejecuta automáticamente cuando la página carga
  ngOnInit(): void {
    // Nos "suscribimos" al servicio. Cada vez que haya un cambio en la base de datos, 
    // esta lista se actualizará mágicamente en tiempo real.
    this.metaService.getMetas().subscribe(data => {
      this.metasLista = data;
    });
  }

  // Método para el botón de "add an item"
  agregarMeta() {
    // Validamos que no intenten guardar una meta en blanco
    if (this.nuevaMetaTexto.trim() !== '') {
      const nuevaMetaObjeto: Meta = {
        meta: this.nuevaMetaTexto
      };
      
      // Le pasamos el objeto al servicio para que lo guarde
      this.metaService.addMeta(nuevaMetaObjeto);
      
      // Limpiamos la caja de texto de la pantalla
      this.nuevaMetaTexto = '';
    }
  }

  // Método para el botón de "delete"
  eliminar(id: string | undefined) {
    if (id) {
      this.metaService.deleteMeta(id);
    }
  }
}
