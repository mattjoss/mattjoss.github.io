<?php get_header();  ?>

<div id="content" class="narrowcolumn">

<?php get_sidebar(); ?>

<div id="contentspacing">

    <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
		<div class="pagepost">
		<h2 id="post-<?php the_ID(); ?>"><?php the_title(); ?></h2>
			<div class="entrytext">
				<?php the_content('<p class="serif">Read more &raquo;</p>'); ?>
	
				<?php link_pages('<p><strong>Pages:</strong> ', '</p>', 'number'); ?>
	
			</div>
		</div>
	  <?php endwhile; endif; ?>
	<?php edit_post_link('Edit this entry.', '<p>', '</p>'); ?>
	</div>

</div>
</div>
<?php get_footer(); ?>