import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import DataTable from '@/components/DataTable.vue'

const localVue = createLocalVue();

localVue.use(Vuex);

let storeItems = [
  {
    '.key': 0,
    Description: 'Lorem Ipsum'
  },
  {
    '.key': 1,
    Description: 'Lorem Ipsum'
  }
];

describe('DataTable.vue', () => {
  let getters;
  let actions;
  let store;
  let wrapper;

  beforeEach(() => {
    actions = {
      bindData: jest.fn(),
      updateData: jest.fn(),
      displayEditor: jest.fn(() => {
        getters.items()[0]['edit'] = true;
      })
    };
    getters = {
      items: () => storeItems,
      isDataLoading: () => false,
      getEditorDescription: () => ''
    };

    store = new Vuex.Store({
      actions,
      getters
    });

    wrapper = shallowMount(DataTable, {
      stubs: ['font-awesome-icon'],
      store,
      localVue
    });
  });


  it('Calls bindData action on mounting', () => {
    expect(actions.bindData).toHaveBeenCalled();
  });

  it('Renders "store.getters.items" in table', () => {
    const trs = wrapper.findAll('tbody tr');
    expect(trs.length).toBe(2);
  });

  it('Calls "DisplayEditor" action on edit button click', () => {
    const editButton = wrapper.find('.table__column__button');
    editButton.trigger('click');
    expect(actions.displayEditor).toHaveBeenCalled();
  });

  it('Calls "updateData" action on update button click', () => {
    const editButton = wrapper.find('.table__column__button');
    editButton.trigger('click');
    expect(wrapper.find('.description-editor').exists()).toBe(true);
    const updateButton = wrapper.find('.button--primary');
    updateButton.trigger('click');
    expect(actions.updateData).toHaveBeenCalled();
  });
});

