<div class='account-info group'>
	<div class='outer'>
		<div class='inner'>
			<div class='controls'>
				<a class='edit' href='<? echo $GLOBALS['base_url'] ?>/user/<?php print $user_data->uid ?>/edit/profile'>Edit</a>
			</div>
			<h2>Account Information</h2>
			<dl>
				<dt class='address'>Address:</dt>
					<dd><?php echo $user_data->address1; ?></dd>
					<?php if (!empty ($user_data->address2)) { echo "<dd class=\"dd-block\">".$user_data->address2."</dd>,";} ?><br /><?php echo $user_data->city; ?></dd>, <dd><?php echo $user_data->state; ?></dd> <dd><?php echo $user_data->zip; ?></dd><br />
				<dt class='email'>Email:</dt><dd><?php echo $user_data->mail ?></dd><br />
				<dt class='birthday'>Birthday:</dt><dd><?php echo date("F d, Y", $user_data->birthday); ?></dd><br />
				<dt class='username'>Username:</dt><dd><?php echo $user_data->name; ?> [<span><a href="<? echo $GLOBALS['base_url'] ?>/user/<?php print $user_data->uid ?>/edit">change password</a></span>]</dd>
			</dl>
		</div>
	</div>
</div>
