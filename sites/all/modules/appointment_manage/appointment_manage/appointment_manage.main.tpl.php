<style>
  #startDate, #endDate { width: 203px; }
  .form-submit { margin: 0; }
  select[name=time] { width:70px; }
  .sticky-enabled .form-item { display: inline; }
</style>

<?php
  $calendar_buttom = url(drupal_get_path('module', 'appointment_manage') . '/calendar.gif');
?>
<script type="text/javascript">
 
 function customRange(input) {
	return {minDate: (input.id == "endDate" ? $("#startDate").datepicker("getDate") : null),
		maxDate: (input.id == "startDate" ? $("#endDate").datepicker("getDate") : null)};
 }
 $(document).ready(function() {
   $("#startDate,#endDate").datepicker({beforeShow: customRange, showOn: "both", buttonImage: "<?php echo $calendar_buttom; ?>", buttonImageOnly: true});
 }); 
</script>
  <!--form>
    From&nbsp;<input type="text" size="10" value="" id="startDate"/>&nbsp;to&nbsp;<input type="text" size="10" value="" id="endDate"/>
    <input type="submit" size="10" value="Go" />
  </form-->
  <?php 
if (false) {
   ?>
   
   
<table>
               <tr>
                 <td><?php echo t('Stylist'); ?></td>
                 <td><?php echo t('Date'); ?></td>
                 <td><?php echo t('Start Time'); ?></td>
                 <td><?php echo t('End time'); ?></td>
                 <td><?php echo t('Customer'); ?></td>
                 <td><?php echo t('Appointment type'); ?></td>
                 <td><?php echo t('Add 30 minute increments'); ?></td>
               </tr>

<?php
  for ($i=0, $n=sizeof($data); $i<=$n; $i++) {
?>
               <tr>
                 <td><?php echo $data[$i]['stylist']; ?></td>
                 <td><?php echo $data[$i]['date']; ?></td>
                 <td><?php echo $data[$i]['stime']; ?></td>
                 <td><?php echo $data[$i]['etime']; ?></td>
                 <td><?php echo $data[$i]['customer']; ?></td>
                 <td><?php echo $data[$i]['appointment_type']; ?></td>
                 <td><?php echo $data[$i]['increments']; ?></td>
               </tr>

<?php  
  }
?>
             </table>
  <?php 
}
   ?>
