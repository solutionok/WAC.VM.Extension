param($stringFormat)

Write-Progress -Activity "Deployment of virtual machine <VMNAME> has started" -percentComplete 0

Start-Sleep -Seconds 1

Write-Progress -Activity "Creating virtual machine in Powershell" -percentComplete 10

# Out-File -FilePath C:\temp\output.txt -InputObject $input -Force
$stringFormat | Out-File -FilePath C:\temp\output.txt -Force
 
Start-Sleep -Seconds 1
Write-Progress -Activity "Configuring CPUs" -percentComplete 20

Start-Sleep -Seconds 1
Write-Progress -Activity "Configuring Memory" -percentComplete 30

Start-Sleep -Seconds 1
Write-Progress -Activity "Adding harddrives" -percentComplete 40

Start-Sleep -Seconds 1
Write-Progress -Activity "Adding networkadapters" -percentComplete 50

Start-Sleep -Seconds 1
Write-Progress -Activity "Starting virtual machine <VMName>" -percentComplete 60

Start-Sleep -Seconds 1
Write-Progress -Activity "Customizing virtual machine with unattend.xml" -percentComplete 70

Start-Sleep -Seconds 1
Write-Progress -Activity "Customizing virtual machine with unattend.xml" -percentComplete 80

Start-Sleep -Seconds 1
Write-Progress -Activity "Doing final checks" -percentComplete 90

Start-Sleep -Seconds 1
Write-Progress -Activity "Deployment of virtual machine <VMNAME> completed" -percentComplete 100