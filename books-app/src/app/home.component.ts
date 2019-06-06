import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as constants from './keys';
import { Router } from '@angular/router';
import { Data } from './data';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
//  styleUrls: ['./app.component.css']
})

export class HomeComponent { 
    static readonly sectionHeaderOptions = {
        DEFAULT: "Top Picks for You",
        SEARCH: "Results"
    }

    constructor(private http: HttpClient, private router: Router,private data: Data){};

    searchText='';
    previousQuery='';
    bookList = [];    
    defaultBooksList = [];
    sectionHeader = HomeComponent.sectionHeaderOptions.DEFAULT;

    ngOnInit(){
        var key = constants.API_ENDPOINT;
        var type = "nonfiction";
        var requestUrl = "https://www.googleapis.com/books/v1/volumes?q="+type+"&key="+key;

        this.http.get(requestUrl).subscribe((res : any) => {
            this.bookList = res.items;
            this.defaultBooksList = res.items; //cache this for later
        });
    }
    
 
    search() {
        var key = constants.API_ENDPOINT;
        var query = this.searchText;

        if(query && query!==""){
            this.sectionHeader = HomeComponent.sectionHeaderOptions.SEARCH;
            var requestUrl = "https://www.googleapis.com/books/v1/volumes?q="+query+"&key="+key;

            this.http.get(requestUrl).subscribe((res : any) => {
                this.bookList = res.items;
            });
        }
    }

    dynamicSearch(newValue){
        // When doing a search while user is typing, use a short delay and check that 
        // the user has paused, so as to avoid constant flashing result updates
        
        setTimeout(this.checkTextUpdated(this.searchText), 1600);
    }

    private checkTextUpdated(previousValue) : any{
        // Compare current search text to that of x# ms ago. If updated, search.
        if(this.searchText === previousValue){
            this.search();
        }
    }

    filter(){
        //TODO enable some filtering options

        // ordered format -   //https://www.googleapis.com/books/v1/volumes?q=flowers&orderBy=newest&key=yourAPIKey
        //by id - https://www.googleapis.com/books/v1/volumes/zyTCAlFPjgYC?key=yourAPIKey
    }

    showPreview(){

    }

    bookSelected($event, book){
        this.data.storage = book;
        this.router.navigate([`/book/${book.id}`], { skipLocationChange: true });
    }

    clear(){
        if(this.sectionHeader!=HomeComponent.sectionHeaderOptions.DEFAULT){
            this.searchText  = "";
            this.sectionHeader = HomeComponent.sectionHeaderOptions.DEFAULT;
            this.bookList = this.defaultBooksList;
        }
    }

}
