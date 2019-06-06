import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as constants from './keys';
import {ActivatedRoute} from "@angular/router";
import { Data } from './data';

@Component({
  selector: 'book',
  templateUrl: './book.component.html',
//  styleUrls: ['./app.component.css']
})

export class BookComponent { 
    private book;

    public constructor(private route: ActivatedRoute,private data: Data) {
        this.book = this.data.storage;

        console.log(JSON.stringify(this.data.storage));        
    }
}