import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroModel } from '../models/heroe.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private url = 'https://login-app-udemy-ffb38.firebaseio.com';

  constructor(private http: HttpClient) {
  }
  
  createHero(hero: HeroModel){
    return this.http.post(`${this.url}/heroes.json`, hero)
      .pipe(
        map( (resp:any) => {
          hero.id = resp.name;
          return hero;
        })
      )
  }

  updateHero(hero: HeroModel){
    
    const heroTemp = {
      ...hero
    }

    delete heroTemp.id;
    return this.http.put(`${this.url}/heroes/${hero.id}.json`, heroTemp);
  }

  deleteHero(id: string){
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }

  getHero(id: string){
    return this.http.get(`${this.url}/heroes/${id}.json`);
  }

  getHeroes(){
    return this.http.get(`${this.url}/heroes.json`)
      .pipe(
        map(this.createArray)
      )
  }

  createArray(heroesObj: object){
    
    if(heroesObj === null) {return [];}
    
    const heroes: HeroModel[] = [];
    
    Object.keys(heroesObj).forEach(key => {
      const hero: HeroModel = heroesObj[key];
      hero.id = key;
      heroes.push(hero);
    });

    return heroes;
  }
}
