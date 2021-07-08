function UserList(props) {
    return (
        <div>
            {
            (() => {
                if(props.userNames.length===6){
                    <ul>
                        <li>{props.userNames[0]}さん</li>
                        <li>{props.userNames[1]}さん</li>
                        <li>{props.userNames[2]}さん</li>
                        <li>{props.userNames[3]}さん</li>
                        <li>{props.userNames[4]}さん</li>
                        <li>{props.userNames[5]}さん</li>
                    </ul>
                } else if (props.userNames.length===5){
                    return (
                        <ul>
                            <li>{props.userNames[0]}さん</li>
                            <li>{props.userNames[1]}さん</li>
                            <li>{props.userNames[2]}さん</li>
                            <li>{props.userNames[3]}さん</li>
                            <li>{props.userNames[4]}さん</li>
                            <li>待機中...</li>
                        </ul>
                    );
                } else if (props.userNames.length===4){
                    return (
                        <ul>
                            <li>{props.userNames[0]}さん</li>
                            <li>{props.userNames[1]}さん</li>
                            <li>{props.userNames[2]}さん</li>
                            <li>{props.userNames[3]}さん</li>
                            <li>待機中...</li>
                            <li>待機中...</li>
                        </ul>
                    );
                } else if(props.userNames.length===3){
                    return (
                        <ul>
                            <li>{props.userNames[0]}さん</li>
                            <li>{props.userNames[1]}さん</li>
                            <li>{props.userNames[2]}さん</li>
                            <li>待機中...</li>
                            <li>待機中...</li>
                            <li>待機中...</li>
                        </ul>
                    );
                } else if(props.userNames.length===2){
                    return (
                        <ul>
                            <li>{props.userNames[0]}さん</li>
                            <li>{props.userNames[1]}さん</li>
                            <li>待機中...</li>
                            <li>待機中...</li>
                            <li>待機中...</li>
                            <li>待機中...</li>
                        </ul>
                    );
                } else if(props.userNames.length===1){
                    return (
                        <ul>
                            <li>{props.userNames[0]}さん</li>
                            <li>待機中...</li>
                            <li>待機中...</li>
                            <li>待機中...</li>
                            <li>待機中...</li>
                            <li>待機中...</li>
                        </ul>
                    );
                }
            })()
            }
        </div>
  );
}

export default UserList;