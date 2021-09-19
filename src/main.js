import { createApp } from 'vue';
import App from "./App";
import components from "@/components";

const app = createApp(App);
components.forEach((item) => app.component(item.name, item));
app.mount('#main-app');
