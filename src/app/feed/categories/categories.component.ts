import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

interface CategoryNode {
  name: string;
  children?: CategoryNode[];
}

const TREE_DATA: CategoryNode[] = [
  {
    name: 'Politique',
    children: [{name: 'Protestation'}, {name: 'Election'}, {name: 'Etat'}],
  },
  {
    name: 'Economie',
    children: [
      {
        name: 'Monaie',
        children: [{name: 'Taux de change'}, {name: 'Marche'}],
      },
      {
        name: 'PN',
        children: [{name: 'PIP'}, {name: 'PNB'}],
      },
    ],
  },
];

/** Flat node with expandable and level information */
interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
}


@Component({
  selector: 'vn-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  private _transformer = (node: CategoryNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }
  ngOnInit(): void {
    
  }

  hasChild = (_: number, node: FlatNode) => node.expandable;


}
