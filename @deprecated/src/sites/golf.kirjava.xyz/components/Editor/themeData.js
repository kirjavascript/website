var themeData = [

    ['Chrome'          ,'chrome'],
    ['Clouds'          ,'clouds'],
    ['Crimson Editor'  ,'crimson_editor'],
    ['Dawn'            ,'dawn'],
    ['Dreamweaver'     ,'dreamweaver'],
    ['Eclipse'         ,'eclipse'],
    ['GitHub'          ,'github'],
    ['IPlastic'        ,'iplastic'],
    ['Solarized Light' ,'solarized_light'],
    ['TextMate'        ,'textmate'],
    ['Tomorrow'        ,'tomorrow'],
    ['XCode'           ,'xcode'],
    ['Kuroir' ,'kuroir'],
    ['KatzenMilch','katzenmilch'],
    ['SQL Server'           ,'sqlserver'               , 'light'],
    ['Ambiance'             ,'ambiance'                ,  'dark'],
    ['Chaos'                ,'chaos'                   ,  'dark'],
    ['Clouds Midnight'      ,'clouds_midnight'         ,  'dark'],
    ['Cobalt'               ,'cobalt'                  ,  'dark'],
    ['idle Fingers'         ,'idle_fingers'            ,  'dark'],
    ['krTheme'              ,'kr_theme'                ,  'dark'],
    ['Merbivore'            ,'merbivore'               ,  'dark'],
    ['Merbivore Soft'       ,'merbivore_soft'          ,  'dark'],
    ['Mono Industrial'      ,'mono_industrial'         ,  'dark'],
    ['Monokai'              ,'monokai'                 ,  'dark'],
    ['Pastel on dark'       ,'pastel_on_dark'          ,  'dark'],
    ['Solarized Dark'       ,'solarized_dark'          ,  'dark'],
    ['Terminal'             ,'terminal'                ,  'dark'],
    ['Tomorrow Night'       ,'tomorrow_night'          ,  'dark'],
    ['Tomorrow Night Blue'  ,'tomorrow_night_blue'     ,  'dark'],
    ['Tomorrow Night Bright','tomorrow_night_bright'   ,  'dark'],
    ['Tomorrow Night 80s'   ,'tomorrow_night_eighties' ,  'dark'],
    ['Twilight'             ,'twilight'                ,  'dark'],
    ['Vibrant Ink'          ,'vibrant_ink'             ,  'dark']

].map(datum => ({
    name: datum[0],
    value: datum[1],
    dark: datum[2] == 'dark'
}));

export default themeData;