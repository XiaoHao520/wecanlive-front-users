<template>
  <div>
    <button type="button" @click="$parent.execCommand('insertOrderedList')">
        {{$parent.locale["ordered list"]}}
    </button>
    <button type="button" @click="$parent.execCommand('insertUnorderedList')">
        {{$parent.locale["unordered list"]}}
    </button>
  </div>
</template>
