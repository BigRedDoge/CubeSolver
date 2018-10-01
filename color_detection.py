import cv2
import numpy as np
from matplotlib import pyplot as plt
import math
import sys
import json

def colorMatch(color):
    cube_rgb = cv2.imread('./cube/' + color + '.jpg')
    cube_hsv = cv2.cvtColor(cube_rgb, cv2.COLOR_BGR2HSV)
    cube_gray = cv2.cvtColor(cube_rgb, cv2.COLOR_BGR2GRAY)

    #cube_gray = cv2.medianBlur(cube_gray,5)
    cube_gray = cv2.adaptiveThreshold(cube_gray,255,cv2.ADAPTIVE_THRESH_GAUSSIAN_C,\
               cv2.THRESH_BINARY,11,2)

    kernel = np.ones((15,15), np.uint8)
    # White Mask
    lower_white = np.array([0, 0, 0])
    upper_white = np.array([255, 30, 255])
    white_mask = cv2.inRange(cube_hsv, lower_white, upper_white)

    white_erosion = cv2.erode(white_mask, kernel, iterations = 1)
    white_res = cv2.bitwise_and(cube_rgb, cube_rgb, mask = white_erosion)

    # Orange Mask
    lower_orange = np.array([7, 50, 50])
    upper_orange = np.array([18, 255, 255])
    orange_mask = cv2.inRange(cube_hsv, lower_orange, upper_orange)

    orange_erosion = cv2.erode(orange_mask, kernel, iterations = 1)
    orange_res = cv2.bitwise_and(cube_rgb, cube_rgb, mask = orange_erosion)

    # Blue Mask
    lower_blue = np.array([90, 50, 50])
    upper_blue = np.array([140, 255, 255])
    blue_mask = cv2.inRange(cube_hsv, lower_blue, upper_blue)

    blue_erosion = cv2.erode(blue_mask, kernel, iterations = 1)
    blue_res = cv2.bitwise_and(cube_rgb, cube_rgb, mask = blue_erosion)

    # Yellow Mask
    lower_yellow = np.array([22, 50, 50])
    upper_yellow = np.array([40, 255, 255])
    yellow_mask = cv2.inRange(cube_hsv, lower_yellow, upper_yellow)

    yellow_erosion = cv2.erode(yellow_mask, kernel, iterations = 1)
    yellow_res = cv2.bitwise_and(cube_rgb, cube_rgb, mask = yellow_erosion)


    # Green Mask
    lower_green = np.array([40, 50, 50])
    upper_green = np.array([85, 255, 255])
    green_mask = cv2.inRange(cube_hsv, lower_green, upper_green)

    green_erosion = cv2.erode(green_mask, kernel, iterations = 1)
    green_res = cv2.bitwise_and(cube_rgb, cube_rgb, mask = green_erosion)

    #cv2.imwrite('cube_res.jpg', green_res)

    # Red Masks
    lower_red = np.array([0,50,50])
    upper_red = np.array([10,255,255])
    red_mask0 = cv2.inRange(cube_hsv, lower_red, upper_red)

    lower_red = np.array([170,50,50])
    upper_red = np.array([180,255,255])
    red_mask1 = cv2.inRange(cube_hsv, lower_red, upper_red)

    red_mask = red_mask0 + red_mask1
    red_erosion = cv2.erode(red_mask, kernel, iterations = 1)
    red_res = cv2.bitwise_and(cube_rgb, cube_rgb, mask = red_erosion)

    kernel = np.ones((50,50), np.uint8)
    mask = red_erosion + green_erosion + yellow_erosion + blue_erosion + orange_erosion + white_erosion
    mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)
    mask = cv2.erode(mask, kernel, iterations = 1)

    res = cv2.bitwise_and(cube_rgb, cube_rgb, mask = mask)
    res_gray = cv2.cvtColor(res, cv2.COLOR_BGR2GRAY)

    white_edges = cv2.Canny(white_erosion,50,80,apertureSize=5)
    white_edges = cv2.morphologyEx(white_erosion, cv2.MORPH_OPEN, kernel)
    white_points = cv2.findNonZero(white_edges)
    if white_points is not None:
        for pt in white_points:
            res[pt[0][1],pt[0][0]] = [255, 255, 255]

    orange_edges = cv2.Canny(orange_erosion,50,80,apertureSize=5)
    orange_edges = cv2.morphologyEx(orange_erosion, cv2.MORPH_OPEN, kernel)
    orange_points = cv2.findNonZero(orange_edges)
    if orange_points is not None:
        for pt in orange_points:
            res[pt[0][1],pt[0][0]] = [0, 128, 255]

    blue_edges = cv2.Canny(blue_erosion,50,80,apertureSize=5)
    blue_edges = cv2.morphologyEx(blue_erosion, cv2.MORPH_OPEN, kernel)
    blue_points = cv2.findNonZero(blue_edges)
    if blue_points is not None:
        for pt in blue_points:
            res[pt[0][1],pt[0][0]] = [255, 0, 0]

    green_edges = cv2.Canny(green_erosion,50,80,apertureSize=5)
    green_edges = cv2.morphologyEx(green_erosion, cv2.MORPH_OPEN, kernel)
    green_points = cv2.findNonZero(green_edges)
    if green_points is not None:
        for pt in green_points:
            res[pt[0][1],pt[0][0]] = [0, 255, 0]

    yellow_edges = cv2.Canny(yellow_erosion,50,80,apertureSize=5)
    yellow_edges = cv2.morphologyEx(yellow_erosion, cv2.MORPH_OPEN, kernel)
    yellow_points = cv2.findNonZero(yellow_edges)
    if yellow_points is not None:
        for pt in yellow_points:
            res[pt[0][1],pt[0][0]] = [0, 255, 255]

    red_edges = cv2.Canny(red_erosion,50,80,apertureSize=5)
    red_edges = cv2.morphologyEx(red_erosion, cv2.MORPH_OPEN, kernel)
    red_points = cv2.findNonZero(red_edges)
    if red_points is not None:
        for pt in red_points:
            res[pt[0][1],pt[0][0]] = [0, 0, 255]


    #print(red_points)



    edges = cv2.Canny(mask,50,80,apertureSize=5)
    points = cv2.findNonZero(edges)
    min = np.amin(points, axis=0)
    max = np.amax(points, axis=0)
    x_max = max[0][0]
    x_min = min[0][0]
    y_min = max[0][1]
    y_max = min[0][1]
    width = int(x_max - x_min)
    height = int(y_max - y_min)


    #cv2.circle(res, ((x_min + int(width/3)), (y_max - int(height/3))), 30, (255, 255, 255), -1, 8, 0)
    #cv2.circle(res, (x_min, y_max), 30, (255, 255, 255), -1, 8, 0)

    w, h = cube_gray.shape[::-1]
    x_max = max[0][0]
    x_min = min[0][0]
    y_min = min[0][1]
    y_max = max[0][1]
    width = int(x_max - x_min)
    height = int(y_max - y_min)

    def midpoint(x1,y1,x2,y2):
        x_mid = int((x1 + x2)/2)
        y_mid = h - int(((y1 + y2)/2))
        color = res[y_mid, x_mid]
        return ([int(color[0]), int(color[1]), int(color[2])])


    # Color 1 midpoint
    mid_1 = midpoint(x_min, y_max, (x_min + int(width/3)), (y_max - int(height/3)))
    mid_2 = midpoint((x_min + int(width/3)), y_max, (x_min + int(width*2/3)), (y_max - int(height/3)))
    mid_3 = midpoint((x_min + int(width*2/3)), y_max, x_max, (y_max - int(height/3)))
    mid_4 = midpoint(x_min, (y_max - int(height/3)), (x_min + int(width/3)), (y_max - int(height*2/3)))
    mid_5 = midpoint((x_min + int(width/3)), (y_max - int(height/3)), (x_min + int(width*2/3)), (y_max - int(height*2/3)))
    mid_6 = midpoint((x_min + int(width*2/3)), (y_max - int(height/3)), x_max, (y_max - int(height*2/3)))
    mid_7 = midpoint(x_min, (y_max - int(height*2/3)), (x_min + int(width/3)), y_min)
    mid_8 = midpoint(x_min + int(width/3), (y_max - int(height*2/3)), (x_min + int(width*2/3)), y_min)
    mid_9 = midpoint(x_min + int(width*2/3), (y_max - int(height*2/3)), x_max, y_min)
    mids = [mid_1, mid_2, mid_3, mid_4, mid_5, mid_6, mid_7, mid_8, mid_9]

    #cv2.circle(res, (mid_1[0], mid_1[1]), 30, (255, 255, 255), -1, 8, 0)

    x_max = max[0][0]
    x_min = min[0][0]
    y_min = max[0][1]
    y_max = min[0][1]
    width = int(x_max - x_min)
    height = int(y_max - y_min)
    # Cube
    #cv2.rectangle(cube_rgb, (x_min, y_max), (x_max, y_min), (255, 255, 255), 10)
    # Color 1
    cv2.rectangle(cube_rgb, (x_min, y_max), ((x_min + int(width/3)), (y_max - int(height/3))), (mid_1[0], mid_1[1], mid_1[2]), 25)
    # Color 2
    cv2.rectangle(cube_rgb, ((x_min + int(width/3)), y_max), ((x_min + int(width*2/3)), (y_max - int(height/3))), (mid_2[0], mid_2[1], mid_2[2]), 25)
    # Color 3
    cv2.rectangle(cube_rgb, ((x_min + int(width*2/3)), y_max), (x_max, (y_max - int(height/3))), (mid_3[0], mid_3[1], mid_3[2]), 25)
    # Color 4
    cv2.rectangle(cube_rgb, (x_min, (y_max - int(height/3))), ((x_min + int(width/3)), (y_max - int(height*2/3))), (mid_4[0], mid_4[1], mid_4[2]), 25)
    # Color 5
    cv2.rectangle(cube_rgb, ((x_min + int(width/3)), (y_max - int(height/3))), ((x_min + int(width*2/3)), (y_max - int(height*2/3))), (mid_5[0], mid_5[1], mid_5[2]), 25)
    # Color 6
    cv2.rectangle(cube_rgb, ((x_min + int(width*2/3)), (y_max - int(height/3))), (x_max, (y_max - int(height*2/3))), (mid_6[0], mid_6[1], mid_6[2]), 25)
    # Color 7
    cv2.rectangle(cube_rgb, (x_min, (y_max - int(height*2/3))), ((x_min + int(width/3)), y_min), (mid_7[0], mid_7[1], mid_7[2]), 25)
    # Color 8
    cv2.rectangle(cube_rgb, (x_min + int(width/3), (y_max - int(height*2/3))), ((x_min + int(width*2/3)), y_min), (mid_8[0], mid_8[1], mid_8[2]), 25)
    # Color 9
    cv2.rectangle(cube_rgb, (x_min + int(width*2/3), (y_max - int(height*2/3))), (x_max, y_min), (mid_9[0], mid_9[1], mid_9[2]), 25)

    colors = []
    for rgb in mids:
        if (rgb[0] == 255 and rgb[1] == 255 and rgb[2] == 255):
            colors.append('w')
        elif (rgb[0] == 0 and rgb[1] == 128 and rgb[2] == 255):
            colors.append('o')
        elif (rgb[0] == 255 and rgb[1] == 0 and rgb[2] == 0):
            colors.append('b')
        elif (rgb[0] == 0 and rgb[1] == 255 and rgb[2] == 0):
            colors.append('g')
        elif (rgb[0] == 0 and rgb[1] == 255 and rgb[2] == 255):
            colors.append('y')
        elif (rgb[0] == 0 and rgb[1] == 0 and rgb[2] == 255):
            colors.append('r')

    cv2.imwrite('./cube_res/cube_' + color + '.jpg', cube_rgb)

    return(colors)

def colorOrganize(w, r, b, o, g, y):
    side_list = [w, r, b, o, g, y]
    sides = {
        'w': w,
        'r': r,
        'b': b,
        'o': o,
        'g': g,
        'y': y
    }
    #print(sides)
    # Positions of colors on solved cube
    colorPositions = {
        'gow': ['g0', 'o2', 'w0'],
        'ow': ['o1', 'w1'],
        'bow': ['b2', 'o0', 'w2'],
        'bw': ['b1', 'w5'],
        'brw': ['b0', 'r2', 'w8'],
        'rw': ['r1', 'w7'],
        'grw': ['g2', 'r0', 'w6'],
        'gw': ['g1', 'w3'],
        'br': ['b3', 'r5'],
        'gr': ['g5', 'r3'],
        'go': ['g3', 'o5'],
        'bo': ['b5', 'o3'],
        'gry': ['g8', 'r6', 'y0'],
        'ry': ['r7', 'y1'],
        'bry': ['b6', 'r8', 'y2'],
        'by': ['b7', 'y5'],
        'boy': ['b8', 'o6', 'y8'],
        'oy': ['o7', 'y7'],
        'goy': ['g6', 'o8', 'y6'],
        'gy': ['g7', 'y3']
    }
    # Positions of colors on unsolved cube
    cubeColors = [
        [[g[0], o[2], w[0]], ['g0', 'o2', 'w0']],
        [[o[1], w[1]], ['o1', 'w1']],
        [[b[2], o[0], w[2]], ['b2', 'o0', 'w2']],
        [[b[1], w[5]], ['b1', 'w5']],
        [[b[0], r[2], w[8]], ['b0', 'r2', 'w8']],
        [[r[1], w[7]], ['r1', 'w7']],
        [[g[2], r[0], w[6]], ['g2', 'r0', 'w6']],
        [[g[1], w[3]], ['g1', 'w3']],
        [[b[3], r[5]], ['b3', 'r5']],
        [[g[5], r[3]], ['g5', 'r3']],
        [[g[3], o[5]], ['g3', 'o5']],
        [[b[5], o[3]], ['b5', 'o3']],
        [[g[8], r[6], y[0]], ['g8', 'r6', 'y0']],
        [[r[7], y[1]], ['r7', 'y1']],
        [[b[6], r[8], y[2]], ['b6', 'r8', 'y2']],
        [[b[7], y[5]], ['b7', 'y5']],
        [[b[8], o[6], y[8]], ['b8', 'o6', 'y8']],
        [[o[7], y[7]], ['o7', 'y7']],
        [[g[6], o[8], y[6]], ['g6', 'o8', 'y6']],
        [[g[7], y[3]], ['g7', 'y3']]
    ]

    for x in cubeColors:
        cubie = ''.join(sorted(x[0]))
        colors_unordered = colorPositions[cubie]
        colors_unordered2 = list(map(lambda z: z[:1], colorPositions[cubie]))
        order = x[0]
        colors = []

        for y in range(len(colors_unordered)):
            index = colors_unordered2.index(order[y])
            colors.append(colors_unordered[index])

        side_len = len(x[1])
        color_len = len(colors)
        def changeColor(side, color):
            side_color = side[:1]
            side_index = int(side[1:2])
            sides[side_color][side_index] = color

        side1 = x[1][0]
        color1 = colors[0]
        changeColor(side1, color1)
        side2 = x[1][1]
        color2 = colors[1]
        changeColor(side2, color2)
        if side_len > 2:
            side3 = x[1][2]
            color3 = colors[2]
            changeColor(side3, color3)
    side_list[0][4] = 'w4'
    side_list[1][4] = 'r4'
    side_list[2][4] = 'b4'
    side_list[3][4] = 'o4'
    side_list[4][4] = 'g4'
    side_list[5][4] = 'y4'
    print(json.dumps(sides))
    return json.dumps(sides)

def main():
    white = colorMatch('white')
    red = colorMatch('red')
    blue = colorMatch('blue')
    orange = colorMatch('orange')
    green = colorMatch('green')
    yellow = colorMatch('yellow')
    #print(white, red, blue, orange, green, yellow)
    #print(colorOrganize(white, red, blue, orange, green, yellow))
    colorOrganize(white, red, blue, orange, green, yellow)

if __name__ == '__main__':
    main()
