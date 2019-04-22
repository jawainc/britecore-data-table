<template>
  <div class="data-table">
    <div class="table-top-bar">
      BriteCore-DataTable
    </div>
    <table class="table">
      <thead>
        <tr>
          <td class="table__head">ID</td>
          <td class="table__head">Name</td>
          <td class="table__head">Description</td>
          <td class="table__head">Date</td>
          <td class="table__head">Amount</td>
        </tr>
      </thead>
      <tbody class="table__body">
        <tr v-if="isDataLoading" >
          <td colspan="5" class="table__column text-center">
            <font-awesome-icon class="loading-icon fa-spin" icon="sync" />
          </td>
        </tr>
        <tr v-for="item of items" v-bind:key="item['.key']">
          <td class="table__column truncate">{{item.ID}}</td>
          <td class="table__column">{{item.Name}}</td>
          <td class="table__column description">
            <div class="table__column__description truncate">
              {{item.Description}}
              <div class="table__column__button" @click="displayEditor({key: item['.key']})"><font-awesome-icon class="edit-icon" icon="pen" /></div>
            </div>

            <transition name="slide">
              <div class="description-editor pop-over" v-if="item.edit">
                <div class="description-editor__head" >
                  {{item.name}}
                  <font-awesome-icon class="close-icon" icon="times" @click="hideEdit" />
                </div>
                <div>
                  <textarea class="description-editor__input" rows="6" v-model="description"></textarea>
                </div>
                <div class="description-editor__action">
                  <button class="button" @click="hideEdit">cancel</button>
                  <button class="button button--primary" @click="updateData">update</button>
                  <font-awesome-icon class="saving-icon fa-spin" icon="sync" v-if="item.saving" />
                </div>
              </div>
            </transition>
          </td>
          <td class="table__column">{{item.Date | parseDate}}</td>
          <td class="table__column text-right">{{item.Amount}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import moment from 'moment';
  import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  name: 'DataTable',
  computed: {
    ...mapGetters([
      'items',
      'isDataLoading',
      'getEditorDescription'
    ]),
    description: {
      get () {
        return this.getEditorDescription
      },
      set (value) {
        this.updateEdit(value);
      }
    }
  },
  mounted () {
    this.bindData();
  },
  filters: {
    // filter for dates
    parseDate: function (value) {
      if (value) {
        return moment(value).format('MM/DD/YY');
      }
      return "";
    }
  },
  methods: {
    ...mapActions([
      'bindData',
      'updateData',
      'displayEditor'
    ]),
    ...mapMutations([
      'hideEdit',
      'updateEdit'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Heebo');
  $edit-color: #42b983;
  $dark-header-bg: #344a5f;
  $dark-bg: #2c3e50;
  $dark-header-text-color: #6a8bad;
  $dark-body-text-color: #fff;
  $pop-over-bg-color: #222f3d;
  $max-width: 1050px;


  .pad-15 {
    padding: 15px;
  }
  .text-left {
    text-align: left;
  }
  .text-right {
    text-align: right;
  }
  .text-center {
    text-align: center;
  }
  .truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .loading-icon {
    font-size: 25px;
  }
  .saving-icon {
    font-size: 12px;
  }
  .close-icon {
    position: absolute;
    cursor: pointer;
    right: 0;
    top: 0;
    color: $dark-header-text-color;
    &:hover {
      color: $edit-color;
    }
  }
  .button {
    display: inline-block;
    vertical-align: middle;
    border: none;
    margin-right: 8px;
    font-family: inherit;
    text-decoration: none;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    position: relative;
    box-sizing: border-box;
    border-radius: 0;
    padding: 0 10px;
    font-size: 12px;
    line-height: 12px;
    height: 25px;
    color: $dark-bg;
    background: $dark-body-text-color;
    outline: 0;
    -webkit-tap-highlight-color: rgba(255,255,255,0);
  }
  .button--primary {
    color: $dark-body-text-color;
    background: $edit-color;
  }
  .table-top-bar {
    padding: 15px 10px;
    max-width: $max-width;
    margin: 0 auto;
    box-sizing: border-box;
    background-color: $dark-header-bg;
    border-bottom: 1px solid darken($dark-header-bg, 3);
    color: $dark-body-text-color;
    font-weight: bold;
  }

  // Data Table
  .data-table {
    font-family: 'Heebo', sans-serif;
  }
  .table {
    border-collapse: collapse;
    margin: 0 auto;
    width: $max-width;
    max-width: $max-width;
  }
  .table__head {
    padding: 15px 10px;
    color: $dark-header-text-color;
    background-color: $dark-header-bg;
    border: none;
    @extend .text-left;
  }
  .table__body {
    font-size: 80%;
    color: $dark-body-text-color;
    background-color: $dark-bg;
  }

  .table__column {
    padding: 10px;
    position: relative;
    text-align: left;
    &.text-right {
      @extend .text-right;
    }
    &.text-center {
      @extend .text-center;
    }
    &.description {
      padding: 0;
    }
  }

  .table__column__description {
    display: block;
    position: relative;
    padding: 10px;
    &:hover {
      .table__column__button {
        left: 0;
      }
    }
  }
  .table__column__button {
    position: absolute;
    top: 0;
    left: -50px;
    height: 100%;
    background: $edit-color;
    color: $dark-body-text-color;
    padding: 0 15px;
    line-height: 40px;
    border-radius: 0 50px 50px 0;
    cursor: pointer;
    transition: all 200ms ease;
  }

  // Editor
  .description-editor {
    padding: 15px;
    background: $pop-over-bg-color;
    color: $dark-body-text-color;
    box-shadow: 0 2px 20px rgba(0,0,0,.3);
    position: absolute;
    width: 100%;
    margin: 0;
    transform-origin: top;
    transition: transform 200ms ease-in-out;
    overflow: hidden;
    top: 0;
    left: 0;
    box-sizing: border-box;
    z-index: 999;
  }
  .description-editor__head {
    position: relative;
    display: block;
    height: 20px;
  }
  .description-editor__input {
    background: $dark-bg;
    border: 1px solid lighten($pop-over-bg-color, 10);
    color: $dark-body-text-color;
    width: 100%;
    outline: none;
    &:focus {
      border-color: $edit-color;
    }
  }

  // Transition
  .slide-enter, .slide-leave-to{
    transform: scaleY(0);
  }

</style>
