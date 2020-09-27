import { Component, OnInit } from '@angular/core';
import { Item, Status } from '../model/model';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  items: Item[] = [];
  currentPage: number;
  totalPages: number;
  totalItems: number;

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.getItemsResponse(0);
  }

  sortBy(prop: string) {
    return this.items.sort((a, b) => a[prop] > b[prop] ? -1 : a[prop] === b[prop] ? 0 : 1);
  }

  getItemsResponse(page: number): void {
    this.itemService.getItemsResponse(page)
      .subscribe(response => {
        this.items = response.items
        this.currentPage = response.currentPage
        this.totalPages = response.totalPages
        this.totalItems = response.totalItems
      });
  }

  completeItem(item: Item) {
    this.itemService.completeItem(item, !item.completed).subscribe(response => {
      this.items = this.items.filter(i => i.id != item.id)
      this.items.push(response)
    })
  }


  updateItem(item: Item) {
    this.itemService.updateItem(item)
      .subscribe(data => item = data)
  }

  createNewTodo(item: Item) {
    console.log("asdas")
    this.itemService.addItem(item).subscribe(data => {
      if (data != undefined)
        this.items.push(data)
    })
  }

  deleteItem(item: Item) {
    this.itemService.deleteItem(item).subscribe(data => {
      this.getItemsResponse(this.currentPage)
    })
  }

}
