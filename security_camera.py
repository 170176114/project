import face_recognition
import urllib.request
import cv2
import numpy as np
import pymongo
from datetime import datetime
import os

client = pymongo.MongoClient("mongodb+srv://304cem:Blacklotus123@cluster0-gfbbm.azure.mongodb.net")
mydb = client["python"]
mycol = mydb["records"]

#video_capture = cv2.VideoCapture('http://10.0.1.3:8080/shot.jpg')

video_capture = cv2.VideoCapture(0)


if (video_capture.isOpened() == False):
    print("Unable to read camera feed")


frame_width = int(video_capture.get(3))
frame_height = int(video_capture.get(4))
time_now = datetime.now()
filename = time_now.strftime("%Y%m%d%H%M")

out = cv2.VideoWriter("./public/video/"+filename+'.mp4', cv2.VideoWriter_fourcc(*'H264'), 10, (frame_width, frame_height))

col = mydb["video"]
video_name = {"name": filename}
x = col.insert_one(video_name)

d = {}
count = 0;
if os.name == 'nt':
    import win32api, win32con
def file_is_hidden(p):
    if os.name== 'nt':
        attribute = win32api.GetFileAttributes(p)
        return attribute & (win32con.FILE_ATTRIBUTE_HIDDEN | win32con.FILE_ATTRIBUTE_SYSTEM)
    else:
        return p.startswith('.') #linux-osx
file_list = [f for f in os.listdir('./public/image') if not file_is_hidden(f)]
for x in file_list:
   # me_image = face_recognition.load_image_file("./image/" + x )
    z = len(file_list)
    #print(file_list)

    # for g in range(z):
    #     d["image{0}".format(g)] = face_recognition.face_encodings(face_recognition.load_image_file("./image/" + x))[0]
    #print(x)
    if count < z:
        d["image{0}".format(count)] = face_recognition.face_encodings(face_recognition.load_image_file("./public/image/" + x))[0]
        count = count + 1
#print(d["image1"])
#print(d)
    #print(x)





    #me_face_encoding = face_recognition.face_encodings(face_recognition.load_image_file("./image/" + x))[0]
    #me_face_encoding = face_recognition.face_encodings(me_image)[0]
    #print(me_face_encoding)


# known_face_encodings = [
#  #me_face_encoding
#
# d["image0"],
# d["image1"]
# ]

known_face_encodings = []

i = 0
while i < len(d):

    known_face_encodings.append( d["image%s"%i] )
    #print(known_face_encodings)
    i = i + 1

known_face_names = []
for quotation in file_list:
    new = '{}'.format(quotation)
    known_face_names.append(new)
# known_face_names = [
#     #name
#         # "tang",
#         # "test"
# ]
#known_face_names.append(name)


# Initialize some variables
face_locations = []
face_encodings = []
face_names = []
process_this_frame = True

while True:

    ret, frame = video_capture.read()
    small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)


    rgb_small_frame = small_frame[:, :, ::-1]


    if process_this_frame:

        face_locations = face_recognition.face_locations(rgb_small_frame)
        face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)

        face_names = []
        for face_encoding in face_encodings:
            # See if the face is a match for the known face(s)
            matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
            name = "Unknown"


            face_distances = face_recognition.face_distance(known_face_encodings, face_encoding)
            best_match_index = np.argmin(face_distances)
            if matches[best_match_index]:
                name = known_face_names[best_match_index]

            now = datetime.now()
            dt_string = now.strftime("%d/%m/%Y %H:%M")
            print(name)
            mydict = {
                "name": name,
                "DateAndTime": dt_string
            }
            mycol.insert_one(mydict)

            face_names.append(name)


    process_this_frame = not process_this_frame

    for (top, right, bottom, left), name in zip(face_locations, face_names):

        top *= 4
        right *= 4
        bottom *= 4
        left *= 4


        cv2.rectangle(frame, (left, bottom), (right, top), (255, 0, 0), 1)


        cv2.rectangle(frame, (left, top - 35), (right, top), (255, 0, 0), cv2.FILLED)
        font = cv2.FONT_HERSHEY_DUPLEX
        cv2.putText(frame, name, (left + 6, top - 6), font, 1.0, (255, 255, 255), 1)
    out.write(frame)


    cv2.imshow('Face recognition', frame)



    if cv2.waitKey(1) & 0xFF == ord('q'):
        break


video_capture.release()
out.release()
cv2.destroyAllWindows()
