from mininet.topo import Topo
from mininet.cli import CLI
from mininet.net import Mininet
from mininet.node import OVSSwitch, RemoteController
from mininet.link import TCLink

class MyTopo(Topo):
    def __init__(self):
        Topo.__init__(self)
        s1 = self.addSwitch('s1')
        s2 = self.addSwitch('s2')
        s3 = self.addSwitch('s3')
        s4 = self.addSwitch('s4')
        
        h1 = self.addHost('h1')
        h2 = self.addHost('h2')
        
        self.addLink(s1,s2,cls=TCLink, bw=30, dealy='5ms', jitter='3ms', loss=0.2)
        self.addLink(s1,s3,cls=TCLink, bw=30, dealy='5ms', jitter='3ms', loss=0.2)
        self.addLink(s1,s4,cls=TCLink, bw=30, dealy='5ms', jitter='3ms', loss=0.2)
        self.addLink(s2,s3,cls=TCLink, bw=30, dealy='5ms', jitter='3ms', loss=0.2)
        self.addLink(s2,s4,cls=TCLink, bw=30, dealy='5ms', jitter='3ms', loss=0.2)
        self.addLink(s3,s4,cls=TCLink, bw=30, dealy='5ms', jitter='3ms', loss=0.2)
        
        self.addLink(s1,h1)
        self.addLink(s4,h2)
topos = {'mytopo': (lambda: MyTopo())}
