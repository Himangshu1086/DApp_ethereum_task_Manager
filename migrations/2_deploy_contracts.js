const Todo_list = artifacts.require("../contracts/Todo_list.sol");

module.exports = function(deployer) {
  deployer.deploy(Todo_list);
};
