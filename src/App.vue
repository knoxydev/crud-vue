<template>

<div id="main-block">
	<div id="all_data_main_block">
		<br>
		<button id="show-add-blc-btn" @click="showAddBlock()">Add Data</button>
		<br>

		<my-add-block v-model:show="add_block_visible">
			<div>Add data to database</div>

			<my-input 
				v-model="inp_data_name"
				type="text"
				placeholder="Enter Name" /><br>

			<my-input 
				v-model="inp_data_address"
				type="text"
				placeholder="Enter Address" /><br>

			<my-input 
				v-model="inp_data_cost"
				type="number"
				placeholder="Enter Cost" /><br>

			<button @click="addDataBtn()"><b>Add +</b></button>
		</my-add-block>

		<br><br>

		<div id="data-block">
			<div id="all_data_blc_title">All Data ({{this.base.length}}) | Page {{this.pageInt}}</div><br>
			<div id="all_data_len_btn_block">
				<button id="all_data_len_btn" @click="pagiButtons($event)" v-for="item in this.pagiDB.length">{{item}}</button>
			</div><br>

			<div id="data-block-item" v-for="item in this.pagination">
				<ul>
					<li>id: <b>{{item.id}}</b></li>
					<li>Address: <b>{{item.address}}</b></li>
					<li>Name: <b>{{item.name_uz}}</b></li>
					<li>Cost: <b>{{item.cost}}</b></li>
					<li>Product type ID: <b>{{item.product_type_id}}</b></li>
				</ul><br><br>
				
				<button @click="showEditBlock($event)">Edit<span>{{item.id}}</span></button>
				<button @click="deleteItemBtn($event)">Delete<span>{{item.id}}</span></button>

				<my-edit-block v-model:show="edit_block_visible">
					<div>Edit data to database</div>

					<my-input 
						v-model="edit_inp_data_name"
						type="text"
						placeholder="Enter new Name" /><br>

					<my-input 
						v-model="edit_inp_data_address"
						type="text"
						placeholder="Enter new Address" /><br>

					<my-input 
						v-model="edit_inp_data_cost"
						type="number"
						placeholder="Enter new Cost" /><br>

					<button id="edit-data-btn" @click="editDataBtn()"><b>Edit</b></button>
				</my-edit-block>

			</div>
		</div>

	</div>
</div>

</template>
<script>

export default {
	data() {
		return {
			base: [],
			pagination: [],
			pagiDB: [],
			pageInt: Number(1),

			inp_data_name: String(""),
			inp_data_address: String(""),
			inp_data_cost: Number(0),
			inp_del_id: Number(0),

			edit_inp_data_id: Number(0),
			edit_inp_data_name: String(""),
			edit_inp_data_address: String(""),
			edit_inp_data_cost: Number(0),

			add_block_visible: Boolean(false),
			edit_block_visible: Boolean(false)
		}
	},
	methods: {
		showAddBlock() {this.add_block_visible = true;},
		showEditBlock(event) {
			this.edit_block_visible = true;
			this.edit_inp_data_id = Number(event.target.childNodes[1].innerHTML);
		},
		createPagination() {
			let array = this.base;
			let size = 3;

			for (let i = 0; i <Math.ceil(array.length/size); i++) {
				this.pagiDB[i] = array.slice((i*size), (i*size) + size);
			}
			this.pagination = this.pagiDB[this.pageInt - 1];
		},
		async deleteItemBtn(event) {
			try {
				let response = await fetch("http://94.158.54.194:9092/api/product/" + event.target.childNodes[1].innerHTML, {
  				method: "DELETE"
  			});
			} catch (error) {alert(error.message);}	

			this.updateDB();
		},
		pagiButtons(event) {
			this.pageInt = Number(event.target.innerHTML);
			this.pagination = this.pagiDB[this.pageInt - 1];
		},
		generateProductID(min, max) {
			let rand = min + Math.random() * (max + 1 - min);
			return Math.floor(rand);
		},
		async updateDB() {
			try {
				let response = await fetch("http://94.158.54.194:9092/api/product", {
  				method: "GET",
  			}).then(async (response) => await response.json())
  			.then((result) => this.base = result);
			} catch (error) {alert(error.message);}

			this.createPagination();
		},
		async addDataBtn() {
			let data = {
				"product_type_id" : this.generateProductID(1, 200),
  			"name_uz": this.inp_data_name,
  			"cost": Number(this.inp_data_cost),
  			"address": this.inp_data_address,
  			"created_date": "2021-09-12T22:16:01.351Z"
			}
			
			try {
				let response = await fetch("http://94.158.54.194:9092/api/product", {
  				method: "POST",
  				headers: {'Content-Type': 'application/json;charset=utf-8'},
  				body: JSON.stringify(data),
  			});
			} catch (error) {}

			this.add_block_visible = false;
			this.updateDB();
		},
		async editDataBtn() {
			let editing_data;

			try {
				let response = await fetch("http://94.158.54.194:9092/api/product?page=1&perPage=10", {
  				method: "GET"
  			}).then(async (response) => await response.json())
  			.then((result) => editing_data = result);
			} catch (error) {alert(error.message);}	

			editing_data.forEach((item) => {
				if (item.id == Number(this.edit_inp_data_id)) editing_data = item;
			});

			let data = {
				"id": Number(this.edit_inp_data_id),
  			"name_uz": this.edit_inp_data_name,
  			"cost": Number(this.edit_inp_data_cost),
  			"address": this.edit_inp_data_address,
  			"created_date": editing_data.created_date,
  			"product_type_id" : editing_data.product_type_id,
			}
			
			try {
				let response = await fetch("http://94.158.54.194:9092/api/product", {
  				method: "PUT",
  				headers: {'Content-Type': 'application/json;charset=utf-8'},
  				body: JSON.stringify(data),
  			});
			} catch (error) {}

			this.edit_block_visible = false;
			this.updateDB();
		},
		async fetch_data() {
			try {
				let response = await fetch("http://94.158.54.194:9092/api/product?page=1&perPage=10", {
  				method: "GET"
  			}).then(async (response) => await response.json())
  			.then((result) => this.base = result);
			} catch (error) {alert(error.message);}
			this.pagination = this.base;

			this.createPagination();
		},
	},
	mounted() {this.fetch_data();}
}

</script>
<style>

:root {
	--main-bg-clr: #032b43;
	--blocks-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px;
	--radius-int: 10px;
}

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: 'Montserrat', sans-serif;
	transition: 0.2s ease-in-out;
}

ul, li {
  padding: 0;
  margin: 0;
  list-style: none;
}

input:focus {outline: none;}
button:focus {outline: none;}

body {background: var(--main-bg-clr);}

#main-block {
	background: transparent;
	padding: 8px;
	margin-left: auto;
	margin-right: auto;
	text-align: left;
	width: 80%;
}

#show-add-blc-btn {
	padding: 8px;
	border: 2px solid white;
	border-radius: 6px;
	background: white;
	color: black;
	font-size: 18px;
	letter-spacing: 2px;
	width: 130px;
	box-shadow: var(--blocks-shadow);
}
#show-add-blc-btn:hover {background: var(--blue-clr);color: white;}

#edit-data-btn {
	padding: 8px;
	border: 2px solid var(--main-bg-clr);
	border-radius: 6px;
	background: var(--main-bg-clr);
	color: white;
	font-size: 16px;
	letter-spacing: 2px;
	width: 130px;
}
#edit-data-btn:hover {
	background: white;
	color: black;
}

#all_data_blc_title {
	background: white;
	font-size: 17pt;
	padding: 12px;
	font-weight: bold;
}

#data-block {
	background: white;
	padding: 12px;
	border: 2px solid white;
	border-radius: var(--radius-int);
	box-shadow: var(--blocks-shadow);
}
#all_data_len_btn_block {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	padding: 6px;	
}
#all_data_len_btn_block > button {
	border: 2px solid transparent;
	padding: 8px;
	background: white;
	color: black;
	font-size: 18pt;
	width: 60px;
	border-radius: var(--radius-int);
	transform: translateY(0px);
}
#all_data_len_btn_block > button:active {transform: translateY(-15px);}
#all_data_len_btn_block > button:hover {background: var(--main-bg-clr); color: white;}

#data-block-item {
	padding: 12px;
	border: 4px solid var(--main-bg-clr);
	margin-bottom: 24px;
	border-radius: var(--radius-int);
	display: inline-block;
	margin-right: 15px;
}
#data-block-item ul {
	display: inline-flex;
	flex-direction: column;
	flex-wrap: wrap;
	justify-content: flex-start;
}
#data-block-item ul li {
	padding: 8px;
	font-size: 14pt;
	padding-bottom: 4px;
}
#data-block-item > button {
	border: 2px solid transparent;
	background: white;
	color: black;
	padding: 8px;
	font-size: 18px;
	font-weight: bold;
	border-radius: 6px;
	letter-spacing: 2px;
}
#data-block-item > button:nth-of-type(1) {margin-right: 10px;}
#data-block-item > button:hover {background: var(--main-bg-clr);color: white;}
#data-block-item > button span {display: none;}


</style>
