import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators,NgModel } from '@angular/forms';
import { WorkerServiceImplementation } from './Service/worker.service';
import {  Product  } from './worker';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-root',
  templateUrl: './marketing.html' ,
  styleUrls: ['./marketing.css']
})

export class AppComponent implements OnInit {

 public productsArray: Product[] = [];
 public deleteProd: Product;
 public passwordCheck: Product;
 createProduct: Product= new Product();
 form = new FormGroup({ 
  productPrice: new FormControl(),
  productLocation: new FormControl('',[Validators.maxLength(63)]),
  productCategory: new FormControl('',[Validators.maxLength(27)]),
  productDescription: new FormControl('',[Validators.maxLength(108)]),
  productPassword: new FormControl('',Validators.minLength(5)),
  contact:new FormControl('',[Validators.minLength(9)]),
  imageUrl: new FormControl('',[Validators.required]),
  imageUrlSource: new FormControl('',[Validators.required]),
  mainImage1:new FormControl('',[Validators.required]),
  mainImageSource1:new FormControl('',[Validators.required]),
  mainImage2:new FormControl(''),
  mainImageSource2:new FormControl(''),
  mainImage3:new FormControl(''),
  mainImageSource3:new FormControl(''),
  mainImage4:new FormControl(''),
  mainImageSource4:new FormControl(''),
 });
 submitPassword= new FormGroup({
   passCheck:new FormControl('',[Validators.minLength(5)]),
 });

  title='workerapp';
  constructor( private workerServiceImplementation: WorkerServiceImplementation){
  }
  ngOnInit(){
     this.getProducts();
  }
 get f(){
   return this.form.controls;
 }
  onFileChange(event:any){
    if(event.target.files.length>0){
      const file = event.target.files[0];
      this.form.patchValue( {
        imageUrlSource:file
      });
     
    }
 }
 onFileChange2(event:any){
  if(event.target.files.length>0){
    const file2 = event.target.files[0];
    this.form.patchValue( {
      mainImageSource1:file2
    });
   
  }
}
onFileChange3(event:any){
  if(event.target.files.length>0){
    const file3 = event.target.files[0];
    this.form.patchValue( {
      mainImageSource2:file3
    });
   
  }
}

onFileChange4(event:any){
  if(event.target.files.length>0){
    const file4 = event.target.files[0];
    this.form.patchValue( {
      mainImageSource3:file4
    });
   
  }
}

onFileChange5(event:any){
  if(event.target.files.length>0){
    const file4 = event.target.files[0];
    this.form.patchValue( {
      mainImageSource4:file4
    });
   
  }
}


  public getProducts(): void{
    this.workerServiceImplementation.getAllProducts().subscribe((response: Product[])=>{
      this.productsArray = response
    }, (error: HttpErrorResponse)=>{
      alert(error.message);
      Swal.fire('Oops', 'Error loading all products', 'error');
    });
  }




  public onPostProduct(){
    const formData= new FormData();
    formData.append("location", this.form.get('productLocation')?.value);
    formData.append("category", this.form.get('productCategory')?.value);
    formData.append("description", this.form.get('productDescription')?.value);
    formData.append("password",this.form.get('productPassword')?.value);
    formData.append("price", this.form.get('productPrice')?.value);
    formData.append("contact",this.form.get('contact')?.value);
    formData.append("mainImage", this.form.get('imageUrlSource')?.value);
    formData.append("extras", this.form.get('mainImageSource1')?.value);
    formData.append("extras", this.form.get('mainImageSource2')?.value);
    formData.append("extras", this.form.get('mainImageSource3')?.value);
    formData.append("extras", this.form.get('mainImageSource4')?.value);

    this.workerServiceImplementation.createProduct(formData);
    this.form.reset();
  }




  public onDeleteProduct(id: number):void{
    this.workerServiceImplementation.deleteProduct(id).subscribe((response:void)=>{ 
      console.log(response);
      this.getProducts();
     
     }, (error: HttpErrorResponse)=>{
      console.log(error);
      Swal.fire('Error', 'Product could not be Deleted', 'error')
      
    });
  }

  public searchProduct(search:any): void{
    const result:Product[] =[];
    for(const product of this.productsArray){
      if(product.productCategory.toLowerCase().indexOf(search.toLowerCase())!==-1 || product.contact.toPrecision().indexOf(search)!==-1 ){
        result.push(product);
      }
    }
    this.productsArray=result;
    if(result.length==0 ||!search){
      this.getProducts();
      
    }
  }


  public checkPassword(actualPass:number,id:number):void{
   var input = this.submitPassword.get('passCheck')?.value;
   if(input==actualPass){
    this.workerServiceImplementation.deleteProduct(id).subscribe((response:void)=>{ 
      console.log(response);
      Swal.fire('Correct Password', 'Product has beeen deleted', 'success')
      this.getProducts();
      
     }, (error: HttpErrorResponse)=>{
      console.log(error);
      Swal.fire('Oops', 'Problem while deleting try later', 'error')
    });
  this.submitPassword.reset();
  }
  else{
    Swal.fire('Wrong Password', 'enter correct password', 'error')
    this.submitPassword.reset();
  }
}

  public onOpenModal( mode:string):void{
    const container= document.getElementById('main-container');
    const button =document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');

    if(mode==='create'){
      button.setAttribute('data-target','#createProduct');
    }
    
    if(mode==='findLoc'){
      button.setAttribute('data-target','#locationForm');
    }
   
   
    container?.appendChild(button);
    button.click();
  }
  public onOpenModalEdit( product:Product, mode:string):void{
    const container= document.getElementById('main-container');
    const button =document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');


    if(mode==='deleteForm'){
      this.deleteProd= product;
      button.setAttribute('data-target','#deleteProduct');
    }
   

    container?.appendChild(button);
    button.click();
  }
}















