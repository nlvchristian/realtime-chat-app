<script setup>
import { io } from "socket.io-client";
import { onMounted, ref } from "vue";

const props = defineProps({
    id: String,
    user: String,
});

const messages = ref([]);
const inputMessage = ref("");

const socket = io("http://localhost:3000");
onMounted(() => {
    socket.on("message", (data) => {
        messages.value.push(data.message);
    });
});

function sendMessage() {
    const messageValue = inputMessage.value.trim();
    if (messageValue) {
        socket.emit("message", { message: messageValue });
        inputMessage.value = "";
    }
}
</script>

<template>
    <div>
        <input type="text" v-model="inputMessage" />
        <button @click="sendMessage">Send</button>

        <p v-for="message in messages">
            {{ message }}
        </p>
        <!-- <p>{{ user }}</p> -->
    </div>
</template>
