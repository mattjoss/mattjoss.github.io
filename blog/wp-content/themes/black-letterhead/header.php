<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head profile="http://gmpg.org/xfn/11">
<meta http-equiv="Content-Type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>" />
<title><?php bloginfo('name'); ?> <?php if ( is_single() ) { ?> &raquo; Blog Archive <?php } ?> <?php wp_title(); ?></title>
<meta name="generator" content="WordPress <?php bloginfo('version'); ?>" /> 
<link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>" type="text/css" media="screen" />
<link rel="alternate" type="application/rss+xml" title="RSS 2.0" href="<?php bloginfo('rss2_url'); ?>" />
<link rel="alternate" type="text/xml" title="RSS .92" href="<?php bloginfo('rss_url'); ?>" />
<link rel="alternate" type="application/atom+xml" title="Atom 0.3" href="<?php bloginfo('atom_url'); ?>" />
<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />
<?php wp_get_archives('type=monthly&format=link'); ?>
<?php wp_head(); ?>
</head>
<body>


<div id="wholepage">
	<div id="leftcornertop">
		<div id="repeatertop">
		</div>
		<div id="rightcornertop">
		</div>	
	</div>
	<div id="repeaterleftside">
	</div>
	<div id="repeaterrightside">
	</div>

	<div id="page">
	</div>

	<div id="header">
		<div id="headerDiv"> 
			<ul id="navbar">
				<li>
					<a href="http://www.roguesheep.com" title="Home">
						<span id='navbar-sheep' class='navBarItem navbar-deselected'></span>
					</a>
				</li>
				<li>
					<a href="http://www.roguesheep.com/products.html" title="Products">
						<span id='navbar-products' class='navBarItem navbar-deselected'></span>
					</a>
				</li>
				<li>
					<a href="http://www.roguesheep.com/support.html" title="Support">
						<span id='navbar-support' class='navBarItem navbar-deselected'></span>
					</a>
				</li>
				<li>
					<a href="http://blog.roguesheep.com/" title="Blog">
						<span id='navbar-blog' class='navBarItem navbar-selected'></span>
					</a>
				</li>
			</ul>
			<a href="http://www.roguesheep.com" title="Home">
				<img id="RSBanner" src="https://s3.amazonaws.com/RogueSheepComMedia/RogueSheepLogo_small.png"/>			
			</a>
			<?php include (TEMPLATEPATH . '/searchform.php'); ?>	
			<div id="rssbutton">
				<a href="<?php bloginfo('rss2_url'); ?>">Subscribe <img src="<?php bloginfo('template_directory'); ?>/images/rss.png" alt="RSS" align="middle"/></a>
			</div>
		</div>
	</div>
	<div id="spacerLine"></div>
