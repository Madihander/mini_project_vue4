import { createStore } from 'vuex'
const Web3 = require('web3')
const web3 = new Web3('wss://eth-goerli.g.alchemy.com/v2/dWTnjn6p6IhhGk7COKqh5iiiw2aaGTQn')

export default createStore({
  state: {
    blocks:[],
    block:{},
    trans:{},
  },
  getters: {
    
    getBlocks(state){
      return state.blocks
    },

  },
  mutations: {
    addBlock(state, newBlock) {
      state.blocks.unshift(newBlock)
      console.log(state.blocks)
    },

    setBlock(state,block) {
      state.block = block
    },
    setTrans(state,trans) {
      state.trans = trans
    }
  
  },
  actions: {
    async newBlockHeaders({commit}){
      
      let subscribe = web3.eth.subscribe("newBlockHeaders")
      .on('data', block => {
        console.log(block);
        let newBlock = {
          number: block.number,
          hash: block.hash,
        }
        commit("addBlock", newBlock)
      })
      console.log(subscribe)
    },

    async getBlock({commit},blockNumberHash) {
      const block = await web3.eth.getBlock(blockNumberHash)
      commit("setBlock",block);
      return block;   
    },

    async getTransaction({commit},transHash) {
      const trans = await web3.eth.getTransaction(transHash)
      commit("setTrans", trans)
      return trans;
    }
  },
  modules: {
  }
})
