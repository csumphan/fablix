# file = open("single.txt", "r")
file = open("scaled.txt", "r")

TS_list = []
TJ_list = []

queries_run = 0

while True:
    line1 = file.readline()
    line2 = file.readline()
    if not line2:
        break

    line1Split = line1.split(';')
    line2Split = line2.split(';')


    TS = int(line1Split[0]) + int(line2Split[0])
    TJ = int(line1Split[1]) + int(line2Split[1])

    TS_list.append(TS)
    TJ_list.append(TJ)

    queries_run += 1

print("Total Queries: " + str(queries_run))
print("Average TS: " + str(sum(TS_list) / len(TS_list)))
print("Average TJ: " + str(sum(TJ_list) / len(TJ_list)))
