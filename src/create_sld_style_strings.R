#' google earth engine takes an XML style definition for a discrete colour legend
#' type = ramp (in the xml) then interpolates between the discrete values 
#' when using the values of a logarithmic function at tiny steps and then 
#' create use these as breaks where earth engine interpolates linearily between 
#' one can create a "approximative logarithmic color ramp"  this script enables
#' the user to get out the xml 

#' current earth engine script (extern) uses one color ramp for all maps, so only 
#' uses the functions `log_breaks` and  `create_sld_style`
#' the sld style then got copy-pasted by hand into google earth


base_path = "/home/leonie/NForGenBav/output/Predictions/zOld/"
fagus_path= paste0(base_path, "Germany_Fagus.sylvatica.tif")
abies_path = paste0(base_path, "Germany_Abies.alba.tif")


#' given a min and a max value create logaritmized even breaks 
#' @param min_boundary  lower boundary
#' @param max_boundary upper boundary
#' @param number_of_breaks  including boundaries (intervals + 1)
log_breaks <- function (min_boundary, max_boundary, number_of_breaks){
  interval <- max_boundary - min_boundary
  max_log <- log(interval) + 1
  round(exp(seq(0, max_log, length.out = number_of_breaks)-1)) + min_boundary
}


log_breaks(0, 15000, 5)
log_breaks(0, 20000, 5)
log_breaks(0, 10000, 5)
log_breaks(0, 7000, 5)
log_breaks(0, 25000, 5)


log_breaks(0, 25000, 21)[11]





#' given logarithmic distributed data create breaks for n groups 
#' @param mode  either each group has the same logarithmic interval (mode = "interval") or 
#'              each group has a similar amount of observations
#' @param cutoff which quantile to use as max value for figuring out the breaks
log_breaks_terra <- function(path, how_many_groups, mode="interval", cutoff = 0.99, rounding = 1){
  orig_data <- as.vector(terra::rast(path))
  logged_data <- log(orig_data[!is.na(orig_data)] + 1)
  cutoff <- quantile(logged_data, cutoff)
  logged_data <- logged_data[logged_data <= cutoff]
  if (mode == "number"){
    groups <- ggplot2::cut_number(logged_data, n=how_many_groups)
  } else {
    groups <- ggplot2::cut_interval(logged_data, n=how_many_groups)
  }
  groups |> 
    levels() |> 
    stringr::str_replace_all("[]\\[\\(]", "") |> 
    stringr::str_split(",") |> 
    unlist() |> 
    unique() |> 
    as.numeric() |> 
    exp() |> 
    .Primitive("-")(1) |>
    round(digits=rounding)
}

fagus_breaks  <- log_breaks_terra(fagus_path, 20)
fagus_breaks

#' helping function for `create_sld_style`
create_color_map_entry <- function(a, colour, label){
  paste0('        <ColorMapEntry color="',
         colour,
         '" quantity="'
         , as.character(a),
         '" label="',
         label,
         '" opacity="1"/>\n')
}

# custom colorRamp given by Leonie
sunset = colorRampPalette(c("#FFEC9DFF", "#F2AF4AFF", "#EB7F54FF", "#C36377FF", "#61599DFF", "#1D457FFF", "#191F40FF", "black"))
risk_palette = colorRampPalette(c("grey90", "#FCFD8F","#F3CE65","#EB9F3C","#9A3F07"))

#' given breaks along values, create and sld XML color ramp definition 
#' that interpolates betwwen the breaks values
#' palette is an integer taking function, returning that many colors evenly spaced from that 
#' palette function 

create_sld_style <- function(breaks, palette=sunset, rev=TRUE){
  colours  <- palette(length(breaks))
  result <- '<RasterSymbolizer>\n    <Opacity>1.0</Opacity>\n     <ChannelSelection>\n        <GrayChannel>\n            <SourceChannelName>1</SourceChannelName>\n        </GrayChannel>\n    </ChannelSelection>\n'
  result <- paste0(result, '    <ColorMap type="ramp">\n')
  for (i in seq(1, length(breaks))){
    if (i %% 5 == 0){
      label <- ""
    } else {
      label <- ''
    }
    result <- paste0(result, create_color_map_entry(breaks[i], colours[i], label))
  }
  result <- paste0(result, '   </ColorMap>\n')
  paste0(result, '</RasterSymbolizer>')
}



create_sld_style(log_breaks(0,15000, 21), palette=sunset)
create_sld_style(seq(0,100, length.out = 5), palette=risk_palette)

legend_breaks <- log_breaks(0, 15000, 5)
legend_breaks
legend_colours  <- sunset(5)
legend_breaks


leg_step <- floor(length(colours)/5)
leg_idxs <- seq(1, length(colours), leg_step)
leg_colours <- colours[leg_idxs]
leg_breaks <- fagus_breaks[leg_idxs]

leg_colours
leg_breaks


base_path = "/home/leonie/NForGenBav/output/Predictions/"
fagus_path= paste0(base_path, "Regeneration_Fagus.sylvatica.tif")
picea_path = paste0(base_path, "Regeneration_Picea.abies.tif")


get_terra_value_quantile <- function(path, quant){
    vals <- terra::values(terra::rast(path))
    quantile(vals, quant, na.rm = TRUE)
}

get_terra_value_quantile(fagus_path, 0.999)
get_terra_value_quantile(fagus_path, 0.998)
get_terra_value_quantile(picea_path, 0.999)
get_terra_value_quantile(picea_path, 0.998)


