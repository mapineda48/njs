<script lang="ts">
import { Component, Prop, Watch } from "vue-property-decorator";
import { Vue } from "@/decorator";
import Popper from "../../Popper/index.vue";

const add = "Añadir Etiqueta";

@Component({
  components: { Popper },
})
export default class Input extends Vue {
  private _value = "";
  private message = "";
  private isLoading = false;
  private timer = null as any;
  private placeholder = add;
  private title = "";

  private set name(value: string) {
    const val = value || "";

    const nameCapitalized =
      val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();

    this.$data._value = nameCapitalized;
  }

  private get name() {
    return this.$data._value;
  }

  private focus() {
    /**
     * https://michaelnthiessen.com/set-focus-on-input-vue/
     */
    const input: HTMLInputElement = this.$refs.name as any;
    input.focus();
  }

  private updated() {
    if (!this.isLoading) this.focus();
  }

  private notify(message: string) {
    if (this.message) {
      this.message = "";
      clearTimeout(this.timer);
      this.timer = 0;
    }

    this.message = message;
    this.timer = setTimeout(() => {
      this.message = "";
      this.timer = 0;
    }, 2000);
  }

  private async save() {
    if (this.isLoading) return;

    if (!this.$data._value) {
      this.notify("Ingrese Etiqueta");
      return;
    }

    this.isLoading = true;

    try {
      await this.onSave(this.$data._value);
    } catch (error) {
      this.notify(error.message);
    } finally {
      this.isLoading = false;
      this.$data._value = "";
    }
  }

  private cancel() {
    if (this.isLoading) return;

    if (this.onCancel) this.onCancel();
    this.$data._value = "";
  }

  @Prop() public onSave!: (value: string) => Promise<void>;
  @Prop() public onCancel!: () => void;
  @Prop() public value!: string;
  @Watch("value") private watchValue(next: string) {
    if (!next) {
      this.placeholder = add;
      this.title = "";
    } else {
      this.placeholder = `Editar "${next}"`;
      this.title = `Editando Etiqueta "${next}"`;
    }

    this.name = next;
    this.focus();
  }
}
</script>

<template>
  <div class="input">
    <input
      ref="name"
      class="effect"
      type="text"
      maxlength="15"
      :title="title"
      :disabled="isLoading"
      :placeholder="placeholder"
      v-model="name"
      v-on:keyup.enter="save"
      v-on:keyup.esc="cancel"
    />
    <Popper :placement="'bottom'" :tooltip="message" />
    <div class="action">
      <font-awesome-icon
        v-if="Boolean($data._value)"
        v-on:click="save"
        :title="placeholder"
        icon="check"
      />
      <font-awesome-icon
        v-if="Boolean($data._value) || Boolean(title)"
        v-on:click="cancel"
        title="Cancelar"
        icon="times"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/style/variables.scss";

.input {
  /* necessary to give position: relative to parent. */
  width: 100%;
  position: relative;

  padding: 1em 1.5em;
  margin-bottom: 0.5em;

  box-sizing: border-box;

  *:focus {
    outline: none;
  }

  input[type="text"] {
    color: #333;
    width: 100%;
    height: 100%;
    border: 0;
    padding: 0;
  }

  .action {
    width: 40px;
    height: 95%;

    //background-color: gray;

    display: flex;
    justify-content: space-around;
    align-items: center;

    position: absolute;
    top: 0px;
    right: 1.5em;
    z-index: 1;

    * {
      cursor: pointer;
    }
  }
}
</style>
