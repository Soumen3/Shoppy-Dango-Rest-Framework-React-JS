import { Box, Card } from "@mui/material";
import React from "react";
import Pic2 from "../images/pic2.png";

function Home() {
  return <>
	<h1>Home Page</h1><hr />
	<Card sx={{width:'100%', height:'100%'}}>
		<Box textAlign="center">
			<img src={Pic2} alt="pic2" style={{width: '30%'}} />
		</Box>
		<Box sx={{
			border: 1,
			color: '#000',
			borderColor: 'black',
			borderStyle: 'solid',
			borderRadius: 5,
			margin: 4,
			padding: 2
		}} >
			<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente officia quaerat nisi corrupti vitae nobis enim blanditiis. Fuga ex consequuntur nam placeat vel laboriosam debitis, voluptatibus repellat quia reprehenderit? Sit quia quos explicabo dolore modi animi accusantium qui autem, natus aliquid quis in quaerat. Reiciendis saepe blanditiis similique eius iste minus in sequi, voluptatum quod corrupti quis, optio ducimus nihil! Explicabo, officiis eaque aut sed perferendis assumenda qui consectetur a quas sequi iste ex sit unde earum asperiores aliquam perspiciatis dolor reiciendis cupiditate laborum saepe nam deleniti dolorum ducimus! Atque, quisquam reprehenderit repellat nostrum libero repellendus iste similique vel! Deserunt officia unde mollitia ullam facilis maiores odio rerum eligendi obcaecati architecto non repudiandae nobis enim corrupti veritatis, expedita fuga iure quisquam. Fugiat facilis dicta deserunt illo, repudiandae exercitationem, nam odio similique necessitatibus commodi, neque voluptate ipsam ex inventore laudantium earum architecto. Fugit, perferendis. Ab magni commodi architecto corporis porro ex quae, similique fugit voluptatum perferendis sequi repudiandae consectetur. Aut quo ipsam magni porro provident in voluptas id harum commodi sed sunt rerum molestias debitis hic exercitationem quis fugit tenetur delectus iure, deserunt ipsum cum doloribus! Ratione similique officiis, hic sed nostrum, quod optio quasi sit explicabo iusto eos, beatae repellendus.
		</p>
		</Box>
	</Card>
	
  </>;
}

export default Home;
