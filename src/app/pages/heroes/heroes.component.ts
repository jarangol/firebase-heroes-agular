import { Component, OnInit } from '@angular/core';
import { HeroModel } from '../../models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  
  heroes: HeroModel[] = [];
  loading = false;

  constructor(private heroesService: HeroesService) { }

  ngOnInit() {
    this.loading = true;
    this.heroesService.getHeroes()
      .subscribe(resp => {
        this.loading = false;
        this.heroes = resp
      });
  }

  deleteHero(hero: HeroModel, i: number){

    Swal.fire({
      title: 'Are you sure?',
      text: `Do you really want to delete ${hero.name}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if(resp.value){
        this.heroes.splice(i,1);
        this.heroesService.deleteHero(hero.id).subscribe();
      }
    });
  }

}
