"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import BackButton from "@/components/back-button"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

// This would typically come from an API or database
const notesData = {
  "uber-data-breach": {
    title: "Uber Data Breach Report",
    date: "June 2, 2023",
    author: "Duy Nguyen",
    content: `
      <h2>Introduction</h2>
      <p>In September 2022, Uber experienced a significant data breach that exposed sensitive information and highlighted vulnerabilities in their security infrastructure. This analysis examines the attack vectors used, the timeline of events, and potential mitigation strategies that could have prevented the breach.</p>
      
      <h2>Attack Vectors</h2>
      <p>The attacker gained initial access through social engineering, specifically targeting an Uber contractor via credential stuffing attacks. After successfully compromising the contractor's personal device, the attacker was able to access their Uber credentials stored in a password manager.</p>
      
      <p>With these credentials, the attacker logged into Uber's VPN to gain access to the internal network. From there, they discovered PowerShell scripts containing administrative credentials for Uber's Privileged Access Management (PAM) system, which provided elevated access to multiple critical systems including:</p>
      
      <ul>
        <li>Google Workspace</li>
        <li>Slack</li>
        <li>AWS environments</li>
        <li>HackerOne bug reports</li>
        <li>Financial data systems</li>
      </ul>
      
      <h2>Timeline of Events</h2>
      <p>The breach followed this approximate timeline:</p>
      
      <ol>
        <li>Initial compromise of contractor credentials through social engineering</li>
        <li>VPN access to internal network</li>
        <li>Discovery of privileged credentials in PowerShell scripts</li>
        <li>Lateral movement through critical systems</li>
        <li>Data exfiltration from multiple sources</li>
        <li>Public announcement of the breach via Uber's Slack</li>
      </ol>
      
      <h2>Potential Mitigations</h2>
      <p>Several security measures could have prevented or limited the impact of this breach:</p>
      
      <ol>
        <li><strong>Multi-factor authentication (MFA)</strong> - Implementing hardware-based MFA tokens rather than push notifications would have made the initial compromise more difficult.</li>
        <li><strong>Zero Trust Architecture</strong> - Limiting access based on least privilege principles and continuous verification would have restricted lateral movement.</li>
        <li><strong>Credential hygiene</strong> - Avoiding storage of administrative credentials in scripts or easily accessible locations.</li>
        <li><strong>Network segmentation</strong> - Properly segmenting critical systems to prevent easy lateral movement.</li>
        <li><strong>Enhanced monitoring</strong> - Implementing behavioral analytics to detect unusual access patterns and activities.</li>
      </ol>
      
      <h2>Conclusion</h2>
      <p>The Uber breach demonstrates how social engineering combined with poor credential management can lead to catastrophic security failures. Organizations should implement defense-in-depth strategies that assume initial perimeters will be breached and focus on limiting lateral movement and privilege escalation opportunities.</p>
    `,
  },
  "ubuntu-virtualbox-silicon": {
    title: "Deploying Ubuntu through VirtualBox on Silicon Mac",
    date: "May 15, 2023",
    author: "Duy Nguyen",
    content: `
      <h2>Introduction</h2>
      <p>Setting up Ubuntu on Apple Silicon Macs requires some special considerations due to the ARM64 architecture. This guide walks through the process of installing Ubuntu on VirtualBox for M1/M2 Macs.</p>
      
      <h2>Prerequisites</h2>
      <ul>
        <li>Apple Silicon Mac (M1, M2, etc.)</li>
        <li>VirtualBox 7.0 or newer (ARM version)</li>
        <li>Ubuntu 22.04 or newer ARM64 ISO</li>
        <li>At least 4GB of free RAM and 25GB storage</li>
      </ul>
      
      <h2>Step 1: Download Required Software</h2>
      <p>First, download the ARM64 version of VirtualBox for macOS and the Ubuntu ARM64 server or desktop ISO:</p>
      <ul>
        <li>VirtualBox ARM: <a href="https://www.virtualbox.org/wiki/Downloads">https://www.virtualbox.org/wiki/Downloads</a></li>
        <li>Ubuntu ARM64: <a href="https://ubuntu.com/download/server/arm">https://ubuntu.com/download/server/arm</a></li>
      </ul>
      
      <h2>Step 2: Install VirtualBox</h2>
      <p>Install VirtualBox by opening the downloaded .dmg file and following the installation instructions. You may need to grant security permissions in System Preferences.</p>
      
      <h2>Step 3: Create a New Virtual Machine</h2>
      <ol>
        <li>Open VirtualBox and click "New"</li>
        <li>Name your VM and select "Linux" as the type and "Ubuntu (64-bit)" as the version</li>
        <li>Allocate at least 4GB (4096MB) of RAM</li>
        <li>Create a new virtual hard disk (VDI) with at least 25GB of space</li>
      </ol>
      
      <h2>Step 4: Configure VM Settings</h2>
      <ol>
        <li>Select your new VM and click "Settings"</li>
        <li>Under "System" > "Processor", allocate at least 2 CPU cores</li>
        <li>Under "Display", allocate 128MB of video memory</li>
        <li>Under "Storage", click on the empty optical drive, then click the disk icon and "Choose a disk file" to select your Ubuntu ISO</li>
        <li>Under "Network", ensure "Adapter 1" is enabled and attached to "NAT"</li>
      </ol>
      
      <h2>Step 5: Install Ubuntu</h2>
      <ol>
        <li>Start the VM and follow the Ubuntu installation prompts</li>
        <li>Select "Install Ubuntu" from the boot menu</li>
        <li>Follow the installation wizard, selecting your language, keyboard layout, and installation type</li>
        <li>Create a user account and password</li>
        <li>Wait for the installation to complete and restart when prompted</li>
      </ol>
      
      <h2>Step 6: Post-Installation Setup</h2>
      <ol>
        <li>Install VirtualBox Guest Additions for better integration:
          <pre>sudo apt update
sudo apt install build-essential dkms linux-headers-$(uname -r)
sudo mount /dev/cdrom /mnt
cd /mnt
sudo ./VBoxLinuxAdditions.run</pre>
        </li>
        <li>Restart the VM to apply changes</li>
      </ol>
      
      <h2>Troubleshooting Common Issues</h2>
      <ul>
        <li><strong>Performance issues:</strong> Ensure you've allocated sufficient RAM and CPU cores</li>
        <li><strong>Boot failures:</strong> Verify you're using the ARM64 version of Ubuntu</li>
        <li><strong>Network connectivity problems:</strong> Try different network adapter settings</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>With these steps, you should have a functioning Ubuntu virtual machine running on your Apple Silicon Mac. This setup is ideal for development, testing, and learning Linux without affecting your main macOS installation.</p>
    `,
  },
  "kali-virtualbox-silicon": {
    title: "Deploying Kali Linux through VirtualBox on Silicon Mac",
    date: "April 20, 2023",
    author: "Duy Nguyen",
    content: `
      <h2>Introduction</h2>
      <p>Setting up Kali Linux on Apple Silicon Macs for cybersecurity training and penetration testing requires specific ARM64 builds and configuration. This guide provides step-by-step instructions for installing Kali Linux on VirtualBox for M1/M2 Macs.</p>
      
      <h2>Prerequisites</h2>
      <ul>
        <li>Apple Silicon Mac (M1, M2, etc.)</li>
        <li>VirtualBox 7.0 or newer (ARM version)</li>
        <li>Kali Linux ARM64 ISO (2023.1 or newer)</li>
        <li>At least 8GB of free RAM and 40GB storage</li>
      </ul>
      
      <h2>Step 1: Download Kali Linux ARM64</h2>
      <p>Download the official Kali Linux ARM64 ISO from the Kali website:</p>
      <ul>
        <li>Kali ARM64: <a href="https://www.kali.org/get-kali/#kali-installer-images">https://www.kali.org/get-kali/#kali-installer-images</a></li>
        <li>Choose the "Installer" version for ARM64 architecture</li>
      </ul>
      
      <h2>Step 2: Create Virtual Machine</h2>
      <ol>
        <li>Open VirtualBox and click "New"</li>
        <li>Name: "Kali Linux", Type: "Linux", Version: "Debian (64-bit)"</li>
        <li>Allocate at least 8GB (8192MB) of RAM for optimal performance</li>
        <li>Create a new virtual hard disk (VDI) with at least 40GB of space</li>
      </ol>
      
      <h2>Step 3: Configure VM Settings</h2>
      <ol>
        <li>Select your Kali VM and click "Settings"</li>
        <li>System > Processor: Allocate at least 4 CPU cores</li>
        <li>Display: Set video memory to 128MB and enable 3D acceleration</li>
        <li>Storage: Attach the Kali Linux ARM64 ISO to the optical drive</li>
        <li>Network: Configure as NAT or Bridged depending on your needs</li>
      </ol>
      
      <h2>Step 4: Install Kali Linux</h2>
      <ol>
        <li>Start the VM and boot from the Kali ISO</li>
        <li>Select "Graphical Install" from the boot menu</li>
        <li>Follow the installation wizard:
          <ul>
            <li>Select language and location</li>
            <li>Configure network settings</li>
            <li>Set up user accounts and passwords</li>
            <li>Partition the disk (use guided partitioning for beginners)</li>
          </ul>
        </li>
        <li>Wait for installation to complete and reboot</li>
      </ol>
      
      <h2>Step 5: Post-Installation Configuration</h2>
      <ol>
        <li>Update the system:
          <pre>sudo apt update && sudo apt upgrade -y</pre>
        </li>
        <li>Install VirtualBox Guest Additions:
          <pre>sudo apt install virtualbox-guest-x11</pre>
        </li>
        <li>Install additional tools if needed:
          <pre>sudo apt install kali-linux-large</pre>
        </li>
        <li>Reboot to apply all changes</li>
      </ol>
      
      <h2>Cybersecurity Tools Verification</h2>
      <p>Verify that key penetration testing tools are working:</p>
      <ul>
        <li><strong>Nmap:</strong> <code>nmap --version</code></li>
        <li><strong>Metasploit:</strong> <code>msfconsole</code></li>
        <li><strong>Wireshark:</strong> Launch from Applications menu</li>
        <li><strong>Burp Suite:</strong> Available in Applications > Web Application Analysis</li>
      </ul>
      
      <h2>Performance Optimization</h2>
      <ul>
        <li>Disable unnecessary services to improve performance</li>
        <li>Adjust display settings for better responsiveness</li>
        <li>Consider using lightweight desktop environment if needed</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>You now have a fully functional Kali Linux environment on your Apple Silicon Mac, ready for cybersecurity training, penetration testing, and security research. Remember to use these tools responsibly and only on systems you own or have explicit permission to test.</p>
    `,
  },
  "vmware-alternative": {
    title: "VMWare: A Simpler Alternative",
    date: "March 10, 2023",
    author: "Duy Nguyen",
    content: `
      <h2>Introduction</h2>
      <p>While VirtualBox is a popular free virtualization solution, VMware offers a more streamlined and often more performant alternative for running virtual machines on both Intel and Apple Silicon Macs. This guide explores VMware as an alternative virtualization platform.</p>
      
      <h2>VMware vs VirtualBox</h2>
      <h3>Advantages of VMware</h3>
      <ul>
        <li><strong>Better Performance:</strong> Generally faster VM execution and graphics performance</li>
        <li><strong>Easier Setup:</strong> More intuitive interface and automated configurations</li>
        <li><strong>Better Integration:</strong> Seamless file sharing and clipboard integration</li>
        <li><strong>Stability:</strong> More stable with fewer crashes and compatibility issues</li>
        <li><strong>Professional Features:</strong> Advanced networking and snapshot management</li>
      </ul>
      
      <h3>Considerations</h3>
      <ul>
        <li><strong>Cost:</strong> VMware Fusion is a paid product (though free for personal use)</li>
        <li><strong>Resource Usage:</strong> May use more system resources than VirtualBox</li>
      </ul>
      
      <h2>VMware Fusion for Mac</h2>
      <h3>Installation Process</h3>
      <ol>
        <li>Download VMware Fusion from the official website</li>
        <li>Install the application following the setup wizard</li>
        <li>Register for a free personal license if applicable</li>
        <li>Grant necessary system permissions</li>
      </ol>
      
      <h3>Creating Your First VM</h3>
      <ol>
        <li>Launch VMware Fusion</li>
        <li>Click "Create a New Virtual Machine"</li>
        <li>Select "Install from disc or image"</li>
        <li>Choose your OS installation media</li>
        <li>Follow the Easy Install process for supported operating systems</li>
        <li>Customize hardware settings as needed</li>
        <li>Start the installation</li>
      </ol>
      
      <h2>Key Features</h2>
      <h3>Unity Mode</h3>
      <p>Run Windows applications alongside Mac applications seamlessly, without seeing the Windows desktop.</p>
      
      <h3>Snapshots</h3>
      <p>Create multiple snapshots of your VM state for easy rollback and testing scenarios.</p>
      
      <h3>Shared Folders</h3>
      <p>Easily share files between your Mac and virtual machines without network configuration.</p>
      
      <h3>Hardware Acceleration</h3>
      <p>Take advantage of hardware acceleration for graphics and compute-intensive tasks.</p>
      
      <h2>Performance Optimization Tips</h2>
      <ul>
        <li><strong>Memory Allocation:</strong> Allocate appropriate RAM based on your host system</li>
        <li><strong>Processor Cores:</strong> Assign multiple cores for better performance</li>
        <li><strong>Graphics Memory:</strong> Increase video memory for graphics-intensive applications</li>
        <li><strong>Hard Disk:</strong> Use SSD storage for better I/O performance</li>
        <li><strong>VMware Tools:</strong> Always install VMware Tools for optimal performance</li>
      </ul>
      
      <h2>Common Use Cases</h2>
      <ul>
        <li><strong>Development:</strong> Testing applications across different operating systems</li>
        <li><strong>Legacy Software:</strong> Running older applications that require specific OS versions</li>
        <li><strong>Security Testing:</strong> Isolated environments for malware analysis</li>
        <li><strong>Training:</strong> Learning different operating systems and software</li>
      </ul>
      
      <h2>Troubleshooting Common Issues</h2>
      <ul>
        <li><strong>Slow Performance:</strong> Check memory allocation and close unnecessary applications</li>
        <li><strong>Network Issues:</strong> Verify network adapter settings and firewall configuration</li>
        <li><strong>Display Problems:</strong> Update VMware Tools and adjust display settings</li>
        <li><strong>File Sharing:</strong> Ensure VMware Tools is installed and sharing is enabled</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>VMware Fusion provides a robust and user-friendly virtualization platform that often outperforms free alternatives. While it comes with a cost, the improved performance, stability, and ease of use make it an excellent choice for users who rely heavily on virtual machines for development, testing, or running multiple operating systems.</p>
    `,
  },
  "wazuh-siem-malware": {
    title: "Wazuh SIEM: Malware Detection and Configuration",
    date: "February 15, 2023",
    author: "Duy Nguyen",
    content: `
      <h2>Introduction</h2>
      <p>Wazuh is a powerful open-source Security Information and Event Management (SIEM) platform that provides comprehensive security monitoring, threat detection, and incident response capabilities. This guide covers setting up Wazuh for effective malware detection and system monitoring.</p>
      
      <h2>What is Wazuh?</h2>
      <p>Wazuh is a free, open-source security platform that unifies XDR and SIEM capabilities. It provides:</p>
      <ul>
        <li><strong>Log Analysis:</strong> Centralized log collection and analysis</li>
        <li><strong>Intrusion Detection:</strong> Real-time threat detection and alerting</li>
        <li><strong>Vulnerability Assessment:</strong> Automated vulnerability scanning</li>
        <li><strong>Compliance Monitoring:</strong> Regulatory compliance reporting</li>
        <li><strong>File Integrity Monitoring:</strong> Detection of unauthorized file changes</li>
      </ul>
      
      <h2>Architecture Overview</h2>
      <h3>Core Components</h3>
      <ul>
        <li><strong>Wazuh Manager:</strong> Central server that analyzes data from agents</li>
        <li><strong>Wazuh Agent:</strong> Lightweight software installed on monitored systems</li>
        <li><strong>Elastic Stack:</strong> Elasticsearch, Logstash, and Kibana for data storage and visualization</li>
        <li><strong>Wazuh Dashboard:</strong> Web interface for monitoring and management</li>
      </ul>
      
      <h2>Installation and Setup</h2>
      <h3>Prerequisites</h3>
      <ul>
        <li>Linux server (Ubuntu 20.04+ or CentOS 7+ recommended)</li>
        <li>Minimum 4GB RAM, 8GB recommended</li>
        <li>At least 50GB of disk space</li>
        <li>Network connectivity between manager and agents</li>
      </ul>
      
      <h3>Installing Wazuh Manager</h3>
      <ol>
        <li>Download and run the installation script:
          <pre>curl -sO https://packages.wazuh.com/4.7/wazuh-install.sh
sudo bash ./wazuh-install.sh -a</pre>
        </li>
        <li>The script will install all components automatically</li>
        <li>Note the admin credentials provided at the end of installation</li>
        <li>Access the web interface at https://your-server-ip</li>
      </ol>
      
      <h2>Malware Detection Configuration</h2>
      <h3>File Integrity Monitoring (FIM)</h3>
      <p>Configure FIM to detect unauthorized file changes that may indicate malware:</p>
      <pre>&lt;syscheck&gt;
  &lt;directories check_all="yes"&gt;/etc,/usr/bin,/usr/sbin&lt;/directories&gt;
  &lt;directories check_all="yes"&gt;/bin,/sbin&lt;/directories&gt;
  &lt;directories check_all="yes" realtime="yes"&gt;/home&lt;/directories&gt;
&lt;/syscheck&gt;</pre>
      
      <h3>Rootkit Detection</h3>
      <p>Enable rootkit detection to identify hidden malware:</p>
      <pre>&lt;rootcheck&gt;
  &lt;disabled&gt;no&lt;/disabled&gt;
  &lt;check_files&gt;yes&lt;/check_files&gt;
  &lt;check_trojans&gt;yes&lt;/check_trojans&gt;
  &lt;check_dev&gt;yes&lt;/check_dev&gt;
  &lt;check_sys&gt;yes&lt;/check_sys&gt;
  &lt;check_pids&gt;yes&lt;/check_pids&gt;
  &lt;check_ports&gt;yes&lt;/check_ports&gt;
  &lt;check_if&gt;yes&lt;/check_if&gt;
&lt;/rootcheck&gt;</pre>
      
      <h3>Active Response</h3>
      <p>Configure automatic responses to detected threats:</p>
      <pre>&lt;active-response&gt;
  &lt;disabled&gt;no&lt;/disabled&gt;
  &lt;command&gt;firewall-drop&lt;/command&gt;
  &lt;location&gt;local&lt;/location&gt;
  &lt;rules_id&gt;5712&lt;/rules_id&gt;
  &lt;timeout&gt;600&lt;/timeout&gt;
&lt;/active-response&gt;</pre>
      
      <h2>Custom Rules for Malware Detection</h2>
      <h3>Creating Custom Rules</h3>
      <p>Create custom rules to detect specific malware patterns:</p>
      <pre>&lt;rule id="100001" level="12"&gt;
  &lt;if_sid&gt;550&lt;/if_sid&gt;
  &lt;match&gt;malware|trojan|virus&lt;/match&gt;
  &lt;description&gt;Possible malware detected&lt;/description&gt;
  &lt;group&gt;malware,&lt;/group&gt;
&lt;/rule&gt;</pre>
      
      <h3>Process Monitoring</h3>
      <p>Monitor for suspicious process execution:</p>
      <pre>&lt;rule id="100002" level="10"&gt;
  &lt;if_sid&gt;2902&lt;/if_sid&gt;
  &lt;match&gt;powershell.exe -enc|cmd.exe /c&lt;/match&gt;
  &lt;description&gt;Suspicious command execution detected&lt;/description&gt;
  &lt;group&gt;malware,suspicious_process&lt;/group&gt;
&lt;/rule&gt;</pre>
      
      <h2>Dashboard and Alerting</h2>
      <h3>Key Dashboards</h3>
      <ul>
        <li><strong>Security Events:</strong> Overview of security incidents</li>
        <li><strong>File Integrity:</strong> File change monitoring</li>
        <li><strong>Vulnerability Assessment:</strong> System vulnerabilities</li>
        <li><strong>Compliance:</strong> Regulatory compliance status</li>
      </ul>
      
      <h3>Setting Up Alerts</h3>
      <ol>
        <li>Configure email notifications in ossec.conf</li>
        <li>Set up Slack or other integrations for real-time alerts</li>
        <li>Define alert thresholds and escalation procedures</li>
        <li>Create custom dashboards for specific use cases</li>
      </ol>
      
      <h2>Best Practices</h2>
      <ul>
        <li><strong>Regular Updates:</strong> Keep Wazuh and rules updated</li>
        <li><strong>Baseline Establishment:</strong> Create baselines for normal system behavior</li>
        <li><strong>Log Retention:</strong> Configure appropriate log retention policies</li>
        <li><strong>Performance Monitoring:</strong> Monitor system performance and adjust as needed</li>
        <li><strong>Incident Response:</strong> Develop and test incident response procedures</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Wazuh provides a comprehensive security monitoring solution that can significantly enhance your organization's ability to detect and respond to malware threats. With proper configuration and tuning, it serves as a powerful tool in your cybersecurity arsenal, providing real-time visibility into your infrastructure's security posture.</p>
    `,
  },
  "packet-tracer-vlan": {
    title: "Packet Tracer: Understanding VLAN and Trunking Configuration",
    date: "January 25, 2023",
    author: "Duy Nguyen",
    content: `
      <h2>Introduction</h2>
      <p>Virtual Local Area Networks (VLANs) are a fundamental networking concept that allows network administrators to logically segment a physical network into multiple broadcast domains. This guide provides hands-on experience with VLAN configuration using Cisco Packet Tracer.</p>
      
      <h2>What are VLANs?</h2>
      <p>VLANs are logical groupings of devices on a network, regardless of their physical location. Key benefits include:</p>
      <ul>
        <li><strong>Security:</strong> Isolate sensitive traffic from other network segments</li>
        <li><strong>Performance:</strong> Reduce broadcast traffic and improve network performance</li>
        <li><strong>Flexibility:</strong> Easily reorganize network without physical changes</li>
        <li><strong>Cost Efficiency:</strong> Reduce the need for additional hardware</li>
      </ul>
      
      <h2>VLAN Types</h2>
      <h3>Data VLAN</h3>
      <p>Carries user-generated traffic such as email, web browsing, and file transfers.</p>
      
      <h3>Voice VLAN</h3>
      <p>Dedicated to Voice over IP (VoIP) traffic for quality of service (QoS) purposes.</p>
      
      <h3>Management VLAN</h3>
      <p>Used for network management traffic, providing secure access to network devices.</p>
      
      <h3>Native VLAN</h3>
      <p>Handles untagged traffic on trunk links, typically VLAN 1 by default.</p>
      
      <h2>Lab Setup in Packet Tracer</h2>
      <h3>Network Topology</h3>
      <p>Create a network with the following components:</p>
      <ul>
        <li>2 Cisco 2960 switches</li>
        <li>6 PCs (2 per VLAN across both switches)</li>
        <li>1 router for inter-VLAN routing</li>
      </ul>
      
      <h3>VLAN Design</h3>
      <ul>
        <li><strong>VLAN 10:</strong> Sales Department (192.168.10.0/24)</li>
        <li><strong>VLAN 20:</strong> Engineering Department (192.168.20.0/24)</li>
        <li><strong>VLAN 30:</strong> Management (192.168.30.0/24)</li>
      </ul>
      
      <h2>Basic VLAN Configuration</h2>
      <h3>Creating VLANs</h3>
      <p>Configure VLANs on both switches:</p>
      <pre>Switch(config)# vlan 10
Switch(config-vlan)# name Sales
Switch(config-vlan)# exit

Switch(config)# vlan 20
Switch(config-vlan)# name Engineering
Switch(config-vlan)# exit

Switch(config)# vlan 30
Switch(config-vlan)# name Management
Switch(config-vlan)# exit</pre>
      
      <h3>Assigning Ports to VLANs</h3>
      <p>Assign access ports to specific VLANs:</p>
      <pre>Switch(config)# interface fastethernet 0/1
Switch(config-if)# switchport mode access
Switch(config-if)# switchport access vlan 10

Switch(config)# interface fastethernet 0/2
Switch(config-if)# switchport mode access
Switch(config-if)# switchport access vlan 20</pre>
      
      <h2>Trunking Configuration</h2>
      <h3>What is Trunking?</h3>
      <p>Trunking allows a single physical link to carry traffic for multiple VLANs between switches. This is accomplished through VLAN tagging.</p>
      
      <h3>Configuring Trunk Ports</h3>
      <p>Configure the link between switches as a trunk:</p>
      <pre>Switch(config)# interface fastethernet 0/24
Switch(config-if)# switchport mode trunk
Switch(config-if)# switchport trunk allowed vlan 10,20,30
Switch(config-if)# switchport trunk native vlan 99</pre>
      
      <h3>Trunk Verification</h3>
      <p>Verify trunk configuration:</p>
      <pre>Switch# show interfaces trunk
Switch# show vlan brief
Switch# show interfaces fastethernet 0/24 switchport</pre>
      
      <h2>Inter-VLAN Routing</h2>
      <h3>Router-on-a-Stick Configuration</h3>
      <p>Configure the router for inter-VLAN communication:</p>
      <pre>Router(config)# interface gigabitethernet 0/0
Router(config-if)# no shutdown

Router(config)# interface gigabitethernet 0/0.10
Router(config-subif)# encapsulation dot1q 10
Router(config-subif)# ip address 192.168.10.1 255.255.255.0

Router(config)# interface gigabitethernet 0/0.20
Router(config-subif)# encapsulation dot1q 20
Router(config-subif)# ip address 192.168.20.1 255.255.255.0</pre>
      
      <h2>Advanced VLAN Features</h2>
      <h3>VLAN Trunking Protocol (VTP)</h3>
      <p>Configure VTP for centralized VLAN management:</p>
      <pre>Switch(config)# vtp mode server
Switch(config)# vtp domain COMPANY
Switch(config)# vtp password cisco123</pre>
      
      <h3>Dynamic Trunking Protocol (DTP)</h3>
      <p>Configure DTP for automatic trunk negotiation:</p>
      <pre>Switch(config-if)# switchport mode dynamic desirable
Switch(config-if)# switchport nonegotiate</pre>
      
      <h2>Troubleshooting VLANs</h2>
      <h3>Common Issues</h3>
      <ul>
        <li><strong>VLAN Mismatch:</strong> Ensure VLAN IDs match across switches</li>
        <li><strong>Trunk Configuration:</strong> Verify trunk ports are properly configured</li>
        <li><strong>Native VLAN:</strong> Ensure native VLAN consistency</li>
        <li><strong>Port Assignment:</strong> Verify ports are assigned to correct VLANs</li>
      </ul>
      
      <h3>Useful Commands</h3>
      <pre>show vlan brief
show interfaces trunk
show vtp status
show spanning-tree vlan [vlan-id]
show mac address-table</pre>
      
      <h2>Security Considerations</h2>
      <ul>
        <li><strong>VLAN Hopping:</strong> Prevent unauthorized VLAN access</li>
        <li><strong>Native VLAN:</strong> Change default native VLAN from VLAN 1</li>
        <li><strong>Unused Ports:</strong> Assign unused ports to a dummy VLAN</li>
        <li><strong>VTP Security:</strong> Use VTP passwords and transparent mode when appropriate</li>
      </ul>
      
      <h2>Best Practices</h2>
      <ul>
        <li>Plan VLAN design before implementation</li>
        <li>Use descriptive VLAN names</li>
        <li>Document VLAN assignments and configurations</li>
        <li>Regularly audit VLAN configurations</li>
        <li>Implement proper security measures</li>
        <li>Test connectivity after configuration changes</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Understanding VLANs and trunking is essential for modern network design and administration. Through hands-on practice with Packet Tracer, you can gain valuable experience in configuring and troubleshooting VLAN implementations. These skills are fundamental for network engineers and form the basis for more advanced networking concepts.</p>
    `,
  },
}

// External links mapping for redirects
const noteExternalLinks = {
  "uber-data-breach": "https://www.notion.so/Uber-Data-Breach-Report-3076402b7ff3448da706d1860c511391",
  "ubuntu-virtualbox-silicon":
    "https://www.notion.so/Ubuntu-Installation-on-VirtualBox-Apple-Silicon-Mac-A-Step-by-Step-Guide-1c87e66581b080369aecdb2abf45fb76",
  "kali-virtualbox-silicon":
    "https://www.notion.so/Kali-Linux-Installation-on-VirtualBox-Apple-Silicon-Mac-A-Step-by-Step-Guide-1c87e66581b080ac9772ed7ac59418a9?pvs=25",
  "vmware-alternative": "https://www.notion.so/VMWare-1ca7e66581b080cb91dfdefe604aaac7",
  "wazuh-siem-malware": "https://www.notion.so/Wazuh-Beginner-Lab-94e189ba5de2458fb9108fd595459ddb",
  "packet-tracer-vlan": "https://www.notion.so/VLANs-Trunking-Lab-1e17e66581b0807b9d13fce15a417938",
}

function AnimatedSection({ children, className = "", delay = 0 }) {
  const { ref, isVisible } = useScrollAnimation(0.1, "0px 0px -50px 0px")

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export default function NoteDetailPage() {
  const params = useParams()
  const [isRedirecting, setIsRedirecting] = useState(false)
  const noteId = params.id

  useEffect(() => {
    // Check if this note has an external link and redirect
    const externalLink = noteExternalLinks[noteId]
    if (externalLink) {
      setIsRedirecting(true)
      // Small delay to show the redirecting message
      setTimeout(() => {
        window.location.href = externalLink
      }, 1000)
      return
    }
  }, [noteId])

  if (isRedirecting) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 pt-24 sm:pt-28">
        <BackButton href="/notes" label="Back to Notes" />
        <AnimatedSection>
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-500/20 rounded-full mb-4">
              <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">Redirecting to Notion...</h1>
            <p className="text-gray-400 text-lg">Taking you to the full article on Notion.</p>
          </div>
        </AnimatedSection>
      </div>
    )
  }

  const note = notesData[noteId]

  if (!note) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 pt-24 sm:pt-28">
        <BackButton href="/notes" label="Back to Notes" />
        <AnimatedSection>
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold text-white">Note not found</h1>
            <p className="text-gray-400 mt-4">The note you're looking for doesn't exist or has been moved to Notion.</p>
          </div>
        </AnimatedSection>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 pt-24 sm:pt-28">
      <BackButton href="/notes" label="Back to Notes" />

      <AnimatedSection>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">{note.title}</h1>
        <div className="flex items-center text-gray-400 mb-8">
          <div className="h-4 w-4 mr-2 bg-gray-400 rounded-full"></div>
          <span>{note.date}</span>
          <span className="mx-2">•</span>
          <span>{note.author}</span>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={50}>
        <div className="theme-card shadow-xl mb-8">
          <div className="pt-6">
            <div
              className="prose prose-invert max-w-none prose-headings:text-cyan-400 prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline prose-pre:bg-gray-900 prose-pre:border prose-pre:border-white/10"
              dangerouslySetInnerHTML={{ __html: note.content }}
            />
          </div>
        </div>
      </AnimatedSection>
    </div>
  )
}
