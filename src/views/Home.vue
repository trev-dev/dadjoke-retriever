<template>
  <v-container>
    <v-row>
      <v-col class="text-center">
        <h1>Get you a dad joke or two?</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex align-center justify-center">
        <v-btn class="mr-2" prepend-icon="mdi-thumb-up" @click="updateLoadedJokes">Yes</v-btn>
        <v-btn
          v-if="!jokesAreLoaded"
          class="ml-2"
          prepend-icon="mdi-thumb-down"
          @click="updateLoadedJokes">
          No Thanks
        </v-btn>
        <v-btn v-else class="ml-2" prepend-icon="mdi-emoticon-sad" @click="makeItWorse">
          Make it stop!
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col style="position: relative;" cols=2 offset=5>
        <v-progress-linear v-if="loading" absolute indeterminate />
      </v-col>
    </v-row>
    <v-row id="chef" :class="{ visible: jokesAreLoaded }">
      <v-col>
        <v-img class="mx-auto" src="@/assets/chefskiss.png" :width=200 />
      </v-col>
    </v-row>
    <v-expand-transition>
      <v-row v-if="jokesAreLoaded">
        <v-col>
          <v-list variant="flat" lines="false">
            <v-list-item
              class="pt-2 pb-2"
              v-for="j in jokesLoaded"
              :prepend-icon="getRandomArrayValue(icons)"
              :key="j.id"
              :title="getRandomArrayValue(sentiments)"
              :subtitle="j.joke" />
          </v-list>
        </v-col>
      </v-row>
    </v-expand-transition>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import { getJokes } from '../lib/dadjoke';
import { getRandomArrayValue } from '../lib/utils';

/** @type Ref<import('../lib/dadjoke').JokeData> */
const jokesLoaded = ref([]);
const loading = ref(false);
const jokeCount = ref(5);
const jokesAreLoaded = computed(() => jokesLoaded.value.length > 0);

const sentiments = [
  "Awful.",
  "Bad!",
  "Daaaaaad!",
  "Eye roller!",
  "Go ahead, she's not listening anyway.",
  "Go ahead, you know you want to :)",
  "Groan.",
  "Horrible.",
  "How badly could they take it?",
  "Kids hate this.",
  "Make your boss proud.",
  "No!",
  "Sad.",
  "Stop.",
  "Terrible.",
  "Thanks dad.",
  "Ugh!",
  "We won't judge you.",
  "Your dad could do worse."
];

const icons = [
  'mdi-close-octagon',
  'mdi-emoticon-confused',
  'mdi-emoticon-dead',
  'mdi-emoticon-frown',
  'mdi-emoticon-poop',
  'mdi-emoticon-wink',
  'mdi-human-cane',
  'mdi-message-off',
  'mdi-octagon',
  'mdi-thumb-down'
];

async function updateLoadedJokes() {
  loading.value = true;
  jokesLoaded.value = await getJokes(jokeCount.value);
  loading.value = false;
}

function makeItWorse() {
  jokeCount.value += 2;
  updateLoadedJokes();
}
</script>

<style scoped>
#chef { opacity: 0; transition: opacity 0.3s; }
#chef.visible { opacity: 1; }
</style>
