pragma solidity >=0.4.16 <0.9.0;

contract Todo_list{
    uint public taskCount = 0 ;

    struct Task{
        uint id;
        string content;
        bool completed;
    }

    mapping(uint => Task) public tasks;

    constructor() public{
        createTask("Check out my new Dapp");
    }

    function createTask(string memory _content) public{
        taskCount++;
        tasks[taskCount] = Task(taskCount , _content , false );
    }

    





}