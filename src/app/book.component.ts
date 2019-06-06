import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as constants from './keys';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from '@angular/common';
import { Data } from './data';

@Component({
  selector: 'book',
  templateUrl: './book.component.html',
//  styleUrls: ['./app.component.css']
})

export class BookComponent { 
    public book;
    forSale = false;
    
    public constructor(private route: ActivatedRoute,private data: Data,private router: Router) {
        this.book = this.data.storage;
        this.forSale = this.book.saleInfo.saleability == "FOR_SALE";      
    }
}