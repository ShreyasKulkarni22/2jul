import { Component, OnInit } from '@angular/core';
import { stock } from '../Models/stock';
import { HttpClient } from '@angular/common/http';
import { StockService } from '../stock.service';
import { ActivatedRoute } from '@angular/router';
import { FinnhubService } from '../finnhub.service';

@Component({
  selector: 'app-viewstocks',
  templateUrl: './viewstocks.component.html',
  styleUrls: ['./viewstocks.component.css']
})
export class ViewstocksComponent implements OnInit{
    stocks:Array<stock>
    id:any



    cp:number
    h:any
    l:any
    op:any
    pc:any
    currentprices=new Map<string,number>()
    res:Object
    constructor(private stockservice:StockService,private route:ActivatedRoute ,private fin:FinnhubService){}
    ngOnInit(): void {
      this.id=this.route.snapshot.paramMap.get('id')
      this.getStocksbyusername(this.id)
      
    }
    
    getStocksbyusername(id:number){
      this.stockservice.getStocksbyusername(id).subscribe(res=>{
        console.log(res);
        
        this.stocks=res
      })
    }

    getStockprice(sym:string){
      this.fin.getQuote(sym).subscribe(response=>{
        this.cp=response['c']
      })
      
    }
    deleteStock(id:number){
      this.stockservice.deleteStockById(id).subscribe(res=>{
          console.log("stock deleted")
          this.getStocksbyusername(id)
      })
    }
}
