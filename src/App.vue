<template>

<div id="main-block">
	<div id="all_data_main_block">
		<br>

		<div id="add_data_block">
			<div>Add data to database</div>

			<label for="add_data_blc_a">Address</label>
			<input 
				v-bind:value="inp_data_name"
				@input="inp_data_name = $event.target.value"
				type="text" 
				id="add_data_blc_a"
				placeholder="Enter Address"><br>

			<label for="add_data_blc_n">Name</label>
			<input 
				v-bind:value="inp_data_address"
				@input="inp_data_address = $event.target.value"
				type="text"
				id="add_data_blc_n"
				placeholder="Enter Name"><br>

			<label for="add_data_blc_c">Cost</label>
			<input 
				v-bind:value="inp_data_cost"
				@input="inp_data_cost = $event.target.value"
				type="number"
				id="add_data_blc_c"
				placeholder="Enter Cost"><br>

			<button @click="addDataBtn()"><b>Add +</b></button>
		</div>

		<br><br>

		<div id="delete_data_block">
			<div>Enter user ID to delete data from the database</div>
			<input
				type="text"
				placeholder="enter ID"
				@input="inp_del_id = $event.target.value">
			<button @click="addDeleteBtn()"><b>Delete</b></button>
		</div>

		<br><br>

		<button @click="updateDB_btn()" id="update_db_btn">Refresh database</button>

		<br><br>

		<div id="data-block">
			<div id="all_data_blc_title">All Data ({{this.base.length}})</div>
			<ul v-for="item in this.base">
				<li><b>id: {{item.id}}</b></li>
				<li><b>Address: {{item.address}}</b></li>
				<li><b>Name: {{item.name_uz}}</b></li>
				<li><b>Cost: {{item.cost}}</b></li>
				<li><b>Product type ID: {{item.product_type_id}}</b></li>
			</ul>
		</div>

	</div>
	<br>
</div>

</template>
<script>

export default {
	data() {
		return {
			base: [],
			inp_data_name: "",
			inp_data_address: "",
			inp_data_cost: 0,
			inp_del_id: 0
		}
	},
	methods: {
		generateProductID(min, max) {
  		let rand = min + Math.random() * (max + 1 - min);
  		return Math.floor(rand);
		},
		async updateDB_btn() {
			try {
				let response = await fetch("http://94.158.54.194:9092/api/product", {
  				method: "GET",
  			}).then(async (response) => await response.json())
  			.then((result) => this.base = result);
			} catch (error) {alert(error.message);}
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
		},
		async addDeleteBtn() {
			try {
				let response = await fetch("http://94.158.54.194:9092/api/product/" + this.inp_del_id, {
  				method: "DELETE"
  			});
			} catch (error) {alert(error.message);}	
		},
		async fetch_data() {
			try {
				let response = await fetch("http://94.158.54.194:9092/api/product?page=1&perPage=10", {
  				method: "GET"
  			}).then(async (response) => await response.json())
  			.then((result) => this.base = result);
			} catch (error) {alert(error.message);}	
		},
	},
	mounted() {
		this.fetch_data();
	}
}

</script>
<style>

:root {
	--blocks-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px;
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

#main-block {
	background: transparent;
	padding: 8px;
	margin-left: auto;
	margin-right: auto;
	text-align: left;
	width: 80%;
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
	border-radius: 6px;
	box-shadow: var(--blocks-shadow);
}
#data-block ul {
	background: white;
	padding: 12px;
	border-bottom: 2px solid #c0c0c0;
}
#data-block ul:nth-last-child(1) {border-bottom: 2px solid transparent;}
#data-block ul li {padding-bottom: 4px;}


#delete_data_block {
	background: white;
	padding: 12px;
	border: 2px solid white;
	border-radius: 6px;
	box-shadow: var(--blocks-shadow);
}
#delete_data_block div {
	font-size: 17pt;
	padding: 12px;
	font-weight: bold;
}
#delete_data_block input {
	width: 150px;
	background: white;
	padding: 8px;
	border: 2px solid #999999;
	font-size: 18px;
	border-radius: 5px 0 0 5px;
}
#delete_data_block button {
	background: white;
	color: black;
	padding: 8px;
	border: 2px solid #999999;
	font-size: 18px;
	border-radius: 0 5px 5px 0;
	margin-left: -2px;
	letter-spacing: 1px;
}
#delete_data_block button:hover {
	border: 2px solid maroon;
	background: maroon;
	color: white;
}


#add_data_block {
	background: white;
	padding: 12px;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	border: 2px solid white;
	border-radius: 6px;
	box-shadow: var(--blocks-shadow);
}
#add_data_block div {
	font-size: 17pt;
	padding: 12px;
	font-weight: bold;
}
#add_data_block label {
	font-size: 14pt;
	margin-bottom: 4px;
}
#add_data_block input {
	padding: 6px;
	font-size: 14pt;
	margin-bottom: 6px;
	border: 2px solid #999999;
	border-radius: 5px;
}
#add_data_block input:focus {border: 2px solid mediumblue;}
#add_data_block button {
	padding: 8px;
	border: 1px solid mediumblue;
	border-radius: 5px;
	background: white;
	color: black;
	font-size: 16px;
	letter-spacing: 1px;
	width: 150px;
}
#add_data_block button:hover {
	background: mediumblue;
	color: white;
}

#update_db_btn {
	width: 100%;
	background: white;
	padding: 12px;
	letter-spacing: 1.5px;
	font-size: 17pt;
	border: 2px solid white;
	border-radius: 6px;
	box-shadow: var(--blocks-shadow);
	transform: translateY(0px);
}
#update_db_btn:active {transform: translateY(-10px);}

</style>