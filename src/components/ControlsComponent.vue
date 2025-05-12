<script setup>
import Button from "./Button.vue";
</script>

<template>
  <section>
    <div class="buttons">
      <Button>
        <p>Add Randome Contact</p>
      </Button>
      <Button>
        <p>Sort by popularity</p>
      </Button>
      <Button>
        <p>Sort by name</p>
      </Button>
    </div>
  </section>
</template>

<style scoped>
.buttons {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
</style>
