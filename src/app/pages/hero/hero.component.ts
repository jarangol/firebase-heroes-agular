import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import Swal from "sweetalert2";
import { Observable } from 'rxjs';

import { HeroModel } from '../../models/heroe.model';
import { HeroesService } from '../../services/heroes.service';


@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})

export class HeroComponent implements OnInit{
  hero: HeroModel = new HeroModel ();
  constructor(private heroesService: HeroesService,
              private route: ActivatedRoute) {

   }

   ngOnInit(){
     const id = this.route.snapshot.paramMap.get('id');
     if(id !== 'new'){
       this.heroesService.getHero(id)
         .subscribe( (resp: HeroModel) => {
           this.hero = resp;
           this.hero.id = id;
         });
     }
     
   }
  
  save(form: NgForm){
    if(!form.valid){
      return;
    }
    Swal.fire({
      title: 'Wait',
      text: 'Saving info',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading()
    
    let petition: Observable<any>;

    if(this.hero.id){
      petition = this.heroesService.updateHero(this.hero);
    }else{
      petition = this.heroesService.createHero( this.hero );
    }
    
    petition.subscribe(resp=> {
      Swal.fire({
        title: this.hero.name,
        text: 'Updated correctly.',
        icon: 'success'
      });
    })
  }

}
