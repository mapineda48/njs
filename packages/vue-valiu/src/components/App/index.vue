<script lang="ts">
import { Component } from "vue-property-decorator";
import { State } from "vuex-class";
import valiu from "@/valiu";
import { Vue } from "@/decorator";
import { Tag } from "@/store/state";
import randomColor from "./color";
import Form from "../Form/index.vue";

@Component({ components: { Form } })
export default class App extends Vue {
  private message = "";
  @State("tags") private tags!: Tag[];

  private async insert(name: string) {
    await valiu.insert({ name, color: randomColor() });
  }

  private async update(name: string, index: number) {
    await valiu.update({ id: this.tags[index].id, name });
  }

  private async remove(index: number) {
    await valiu.delete(this.tags[index].id);
  }

  private mounted() {
    if (this.tags) return;
    valiu
      .get()
      .then(tags => {
        this.$store.commit("tags", tags);
      })
      .catch(err => (this.message = err.message));
  }
}
</script>

<template>
  <div class="app">
    <div>
      <Form
        v-if="Boolean(tags)"
        :tags="tags"
        :insert="insert"
        :update="update"
        :remove="remove"
      />
      <div v-if="message">
        <h1>Ups...</h1>
        <p>{{ message }}</p>
        <p>Por favor recargar la página.</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;

  > div {
    margin-top: 1em;
    width: 450px;
  }

  &,
  * {
    box-sizing: border-box;
  }
}
</style>
